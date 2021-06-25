
// (1/2) Bring in the tools needed

const mysql = require("mysql");
const inquirer = require("inquirer");

// (2/2) Establish the connection

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Enterpwhere",
    database: "cms_employee_tracker_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;

    // If no error, initiate the main menu
    console.log("Welcome to the Employee Tracker CMS. Now initiating the Main Menu...")
    initiateMenu();
  });

// (All Else) After the connection is established, be able to use any of the following functions below (initiateMenu & the add, view, or update functions)

function initiateMenu(){
    // Prompt user with menu options
    inquirer
    .prompt({
        name: "action",
        type: "rawlist",
        message: "Main Menu:",
        choices: [
            "Add departments",
            "Add roles",
            "Add employees",
            "View departments",
            "View roles",
            "View employees",
            "Update employee roles"   
        ]
    })
    // When user selects a menu option, execute that menu option's associated function
    .then(function(answer) {
        switch (answer.action) {
            case "Add departments":
                addDepartment();
                break;

            case "Add roles":
                addRole();
                break;

            case "Add employees":
                addEmployee();
                break;

            case "View departments":
                viewDepartment();
                break;
            
            case "View roles":
                viewRoles();
                break;
            
            case "View employees":
                viewEmployees();
                break;
            
            case "Update employee roles":
                // functionName();
                break; 
        }
    });
}

// Table of Contents:
// 1.) All the "add" functions
// 2.) All the "view" functions
// 3.) All the "update" functions (note: just one)


// The "add" functions

function addDepartment() {
    // This function adds a new department to the department list...
    inquirer.prompt([
        // Ask the user to enter the name of the department they want to add
        {
        name: "departmentName",
        type: "input",
        message: "Enter the new department name:"
        }
    ]).then(function(answer) {
        // Take the input and add it to the db
        var sqlQuery = "INSERT INTO department(department_name) VALUES (?)";
        connection.query(sqlQuery, answer.departmentName, function(err, res) {
            if (err) throw err;
            console.log("\n The new department name " + "'" + answer.departmentName + "'" + " has been added...\n ");
            initiateMenu();
        });
    });
}

function addRole() {
    // This function adds a new role to the role list...
    // First, since it will eventually ask the user what department the new role will be in, have a department list array handy
    var listOfDepartments = [];
    var sqlQuery = "SELECT * FROM department";
    connection.query(sqlQuery, function(err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++){
            listOfDepartments.push(res[i].department_name);
        }

        // Second, then ask the user to enter the name and other info of the role they want to add
        inquirer.prompt([
            {
            name: "roleName",
            type: "input",
            message: "Enter the new role's name:"
            },
            {
            name: "roleSalary",
            type: "input",
            message: "Enter the new role's salary:"
            },
            {
            name: "roleDepartment",
            type: "list",
            message: "Select the new role's department:",
            choices: listOfDepartments
            }
        ]).then(function(answer) {

            // Remember that the user entered a department name, which we now need to convert to the department's id
            var idForDepartment;
            for (i = 0; i < res.length; i++) {
                if (answer.roleDepartment === res[i].department_name) {
                    idForDepartment = res[i].id; 
                }
            }
            
            // Put this into an array to be used for the VALUES input
            var promptValues = [
                answer.roleName,
                answer.roleSalary,
                idForDepartment
            ]

            // Take the input and add it to the db
            var sqlQuery = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
            connection.query(sqlQuery, promptValues, function(err, res) {
                if (err) throw err;
                console.log("\n The new role name " + "'" + answer.roleName + "'" + " has been added...\n ");
                initiateMenu();
            });
        });
    });  
}

function addEmployee() {
    // This function adds a new employee to the employee list...
    // Note: in the "addRole" function above I started with an sql query to populate the array of Departments so that all my prompts could be together. For the "addEmployee" function I haven't been able to figure out how to send two sql queries into connection.query so my following function is going to be a little backwards and not look as good :( Maybe whoever might review this will have a better solution than mine?
    // So with that said...start with the basic prompts first this time:
    inquirer.prompt([
        {
        name: "employeeFName",
        type: "input",
        message: "Enter the new employee's first name:"
        },
        {
        name: "employeeLName",
        type: "input",
        message: "Enter the new employee's last name:"
        }
    ]).then(function(employeeNameAnswer) {
        // Note: I'm not sure, but I think I need to capture in a couple variables here what the employeeNameAnswers were because I don't think these answers trickle down into each ".then" parameter hereafter
        // So here goes (and I'll reference them later inside an array for when the final ".then" operation happens):
        var employeeFName = employeeNameAnswer.employeeFName;
        var employeeLName = employeeNameAnswer.employeeLName;

        // Now lets do a sql query for what possible Roles the user can choose from (and then we'll do another ".then" for the person's potential Manager to choose from)
        var sqlQuery = "SELECT * FROM role";
        connection.query(sqlQuery, function(err, res) {
            if (err) throw err;
            var listOfRoles = [];
            for (i = 0; i < res.length; i++){
                listOfRoles.push(res[i].title);
            }

            inquirer.prompt([
                {
                name: "employeeRole",
                type: "list",
                message: "Select the new employee's role:",
                choices: listOfRoles
                }
            ]).then(function(roleAnswer) {

                // Note: I'm not sure, but I think I need to capture in a variable here what the roleAnswer was because I don't think these answers trickle down into each ".then" parameter hereafter
                // Since the prompt answer of "employeeRole" is a role and not an id, and we need to end up with an id, we need to convert this variable value to it's id equivalent
                var employeeIdForRole;
                for (i = 0; i < res.length; i++) {
                    if (roleAnswer.employeeRole === res[i].title) {
                        employeeIdForRole = res[i].id; 
                    }
                }
                
                // Now we move on to getting the manager ID...
                // Note: I'm not sure how to nicely concatenate FName and LName for a list of choices. Therefore (and this is janky and maybe costly if this was a big database) I'm going to console.table all employees so the user can find the name of the employee who is also a manager, and look at the table to find that person's manager ID. The user will then be prompted to enter the manager number ID and not the manager's FName and LName. Maybe if I had more time I could figure out how to only list employees who have manager IDs but I'll have to do that later.
                
                console.log("Instructions (This is a Short-term Solution): here is a list of employees in this small database who might also be managers. Locate them by their first_name and last_name then see what manager_id they have for the last column. When prompted, enter their manager_id number and not their first or last name. Thank you :)");

                var sqlQuery = "SELECT * FROM employee";
                connection.query(sqlQuery, function(err, res) {
                    if (err) throw err;

                    // Display all the employees and their manager ids so that the user can locate which number to use
                    console.table(res);

                    // Now store the manager_id values that are possible to choose from when the prompt asks for it coming up in a second
                    var listOfManagerIDs = [];
                    for (i = 0; i < res.length; i++){
                        listOfManagerIDs.push(res[i].manager_id);
                    }
                
                    inquirer.prompt([
                        {
                        name: "employeeManager",
                        type: "list",
                        message: "After reviewing the table of employees with manager_ids up above, please now select the manager number ID that the new employee should have:",
                        choices: listOfManagerIDs
                        }
                    ]).then(function(managerAnswer) {
                        
                        // Store the employeeManager answer into a variable and then add up all the variables into an array to then send to the sql database
                        var employeeManager = managerAnswer.employeeManager;

                        var promptValues = [
                            employeeFName,
                            employeeLName,
                            employeeIdForRole,
                            employeeManager
                        ]

                        // Take the input and add it to the db
                        var sqlQuery = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                        connection.query(sqlQuery, promptValues, function(err, res) {
                            if (err) throw err;
                            console.log("\n The new employee with the name of " + "'" + employeeFName + " " + employeeLName + "'" + " has been added...\n ");
                            initiateMenu();
                        });
                    });
                });
            });
        });
    });
}
// The "view" functions

function viewDepartment() {
    // This function simply lists all departments that exist...
    var sqlQuery = "SELECT * FROM department";
    connection.query(sqlQuery, function(err, res) {
        if (err) throw err;
        console.table(res);
        // Then reinitiate the Menu so the user can take more actions
        initiateMenu();
    }); 
}

function viewRoles() {
    // This function simply lists all roles that exist...
    var sqlQuery = "SELECT role.id, role.title, role.salary, department.department_name FROM role, department WHERE department.id = role.department_id";
    connection.query(sqlQuery, function(err, res) {
        if (err) throw err;
        console.table(res);
        // Then reinitiate the Menu so the user can take more actions
        initiateMenu();
    });
}

function viewEmployees() {
    // This function simply lists all employees that exist...
    var sqlQuery = "SELECT employee.id AS 'Employee ID', employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Role Title', role.salary AS 'Role Salary', department.department_name AS 'Department', CONCAT(manager.first_name, ' ' , manager.last_name) AS 'Manager' FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee AS manager ON manager.id = employee.manager_id";
    connection.query(sqlQuery, function(err, res) {
        if (err) throw err;
        console.table(res);
        // Then reinitiate the Menu so the user can take more actions
        initiateMenu();
    });
}

// The "update" functions (just one for now)