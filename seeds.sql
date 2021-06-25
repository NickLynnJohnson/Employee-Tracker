
-- Use the correct database --
USE cms_employee_tracker_db;

-- Populate the database --

-- -- Department seed -- -- 
INSERT INTO department (id, department_name)
VALUES (1, "Sales");

INSERT INTO department (id, department_name)
VALUES (2, "Marketing");

INSERT INTO department (id, department_name)
VALUES (3, "Operations");

INSERT INTO department (id, department_name)
VALUES (4, "Customer Service");

INSERT INTO department (id, department_name)
VALUES (5, "Product");

INSERT INTO department (id, department_name)
VALUES (6, "Engineering");

INSERT INTO department (id, department_name)
VALUES (7, "Human Resources");

INSERT INTO department (id, department_name)
VALUES (8, "Legal");

INSERT INTO department (id, department_name)
VALUES (9, "Accounting");

-- -- Role seed -- --
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Accountant Manager", 120000, 9);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Accountant", 60000, 9);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Product Manager", 80000, 5);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Customer Service Rep", 35000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "HR Person", 55000, 7);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Engineer", 101000, 6);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "VP Sales", 150000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "Marketer", 62000, 2);

-- -- Employee seed -- --
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Fred", "Smith", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Jason", "Bretherton", 2, 0);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Alex", "Johnson", 3, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Ricky", "Gervais", 4, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Stephen", "Merchant", 5, 0);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Warrick", "Davis", 6, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Liam", "Nesson", 7, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Johnny", "Depp", 8, 7);