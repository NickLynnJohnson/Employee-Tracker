
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

-- -- Employee seed -- --
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Steve", "Smith", 1, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Bob", "Bretherton", 2, 1);
