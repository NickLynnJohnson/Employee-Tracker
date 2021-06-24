
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
            // functionName();
            break;

        case "Add employees":
            // functionName();
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
    inquirer.prompt({
        // Ask the user to enter the name of the department they want added
        name: "departmentName",
        type: "input",
        message: "Enter the new department name:"

    }).then((answer) => {
        // Take the input and add it to the db
        var sqlQuery = "INSERT INTO department(name) VALUES (?)";
        connection.query(sqlQuery, answer.departmentName, (err, res) => {
            if (err) throw err;
            console.log("\n The new department name " + "'" + answer.departmentName + "'" + " has been added...\n ");
            initiateMenu();
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
    })  
}

function viewRoles() {
    // This function simply lists all roles that exist...
    var sqlQuery = "SELECT * FROM role";
    connection.query(sqlQuery, function(err, res) {
        if (err) throw err;
        console.table(res);
        // Then reinitiate the Menu so the user can take more actions
        initiateMenu();
    }) 
}

function viewEmployees() {
    // This function simply lists all employees that exist...
    var sqlQuery = "SELECT * FROM employee";
    connection.query(sqlQuery, function(err, res) {
        if (err) throw err;
        console.table(res);
        // Then reinitiate the Menu so the user can take more actions
        initiateMenu();
    }) 
}