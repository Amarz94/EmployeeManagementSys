use employeedb;

INSERT INTO department 
    (name)
VALUES
    ('Sales'),
    ('Accounting'),
    ('Customer Service'),
    ('Human Resources'),
    ('Managment');

INSERT INTO role 
    (title, salary, department_id)
VALUES
    ('Paper Salesmen', 40000, 1),
    ('Leader Paper Salesmen', 45000, 1),
    ('Accountant', 65000, 2),
    ('Lead Accountant', 75000, 2),
    ('Quality Control', 69000, 3),
    ('Customer Service', 55000, 3),
    ('Human Resources Officer', 80001, 4),
    ('Regional Manager', 80000, 5);   

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Scott', 8, NULL),
    ('Dwight', 'Schrute', 1, 1),
    ('Jim', 'Halpert', 1, 1),
    ('Phyllis', 'Vance', 1, 1),
    ('Stanley', 'Hudson', 1, 1),
    ('Andrew', 'Bernard', 1, 1),
    ('Kevin', 'Malone', 2, 1),
    ('Oscar', 'Martinez', 2, 1),
    ('Angela', 'Martin', 2, 1),
    ('Pam', 'Beesly', 3, 1),
    ('Creed', 'Bratton', 3, 1),
    ('Kelly', 'Kapoor', 3, 1),
    ('Toby', 'Flenderson', 4, 1);



