DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;

USE cms_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Creating table for ROLE with auto increment id
-- BEFORE SEED use: ALTER TABLE role AUTO_INCREMENT=10;
-- this will ensure we begin with 2 integers from 10 
CREATE TABLE role(
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(30) NOT NULL,
     salary DECIMAL NOT NULL,
     department_id INT NOT NULL,

--links to department id from departments table
     FOREIGN KEY (department_id)
     REFERENCES (department(id))
);


-- Creating table for employees with auto increment id
-- BEFORE SEED use: ALTER TABLE role AUTO_INCREMENT=1000;
-- this will ensure we begin with 4 integers from 1000 
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENTPRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,

--links to role ID from role table
    FOREIGN KEY (role_id)
    REFERENCES (role(id))

--links to manager id from employees table
    FOREIGN KEY (manager_id)
    REFERENCES (employees(id)) 
) 