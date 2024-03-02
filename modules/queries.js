const mysql = require('mysql2');
const db = require('../db/connections');

// queries are within an exportable class
class Database {

    // all departments database query returns a promise result object to be used when called with an async function
    static async allDepartments() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) {
                    reject(new Error("error retrieving dept db" + err)); //new error allows me to customise the error note for 'reject' syntax
                } else {
                    resolve(result)
                };
            });
        })
    };

    // all departments database query returns a promise result object to be used when called with an async function
    static async allroles() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) {
                    reject(new Error("error retrieving roles db" + err)); //new error allows me to customise the error note for 'reject' syntax
                } else {
                    resolve(result)
                };
            });
        })
    };

    // all employees database query returns a promise result object to be used when called with an async function
    static async allEmployees() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM employees`, (err, result) => {
                if (err) {
                    reject(new Error("error retrieving employees db" + err)); //new error allows me to customise the error note for 'reject' syntax
                } else {
                    resolve(result)
                };
            });
        })
    };


    //add dept database query returns a promise result object to be used when called with an async function
    //? placeholder is used for user input from inquirer function. this input is passed in as a parameter
    //After updating the db i call the whole updated department db to return to the user 
    static async addDepartment(departmentName) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO department (name) VALUES (?)`, [departmentName], (err, result) => {
                if (err) {
                    reject(new Error("error inserting new dept into db" + err)); //new error allows me to customise the error note for 'reject' syntax
                } else {
                    //want to console log the result object to see metadata of process
                    console.log("Inserted new department successfully.", result);
                    // this refers to the instance of the class on which the method is called. using class methods to utilise the 1st static function
                    // which is to call allDepartments now that it has been updated
                    this.allDepartments().then(resolve).catch(err => {
                        reject(new Error("Error retrieving updated department db" + err)); //customised error on reject here to track where code can break
                    });
                }
            });
        });
    };


    //values placeholders kept within an array for update
    static async addRole(roleName, roleSalary, roleDeptId) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [roleName, roleSalary, roleDeptId], (err, result) => {
                if (err) {
                    reject(new Error("error inserting new role into db" + err)); //new error allows me to customise the error note for 'reject' syntax
                } else {
                    this.allroles().then(resolve).catch(err => {
                        reject(new Error("error retrieving updated role db" + err)); //customised error on reject here to track where code can break
                    })
                };
            });
        })
    };


    static async addEmployee(newFirstName, newLastName, newId) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO employees (first_name, last_name, role_id,  manager_id ) VALUES (?, ?, ?, ?)`, [newFirstName, newLastName, newId], (err, result) => {
                if (err) {
                    reject(new Error("error inserting new employee into db" + err)); //new error allows me to customise the error note for 'reject' syntax
                } else {
                    this.allEmployees().then(resolve).catch(err => {
                        reject(new Error("error retrieving updated role db" + err)); //customised error on reject here to track where code can break
                    })
                };
            });
        })
    };

    static async updateEmployeeRole(personID, roleID) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE employees SET role_id = (?) WHERE id = (?)`, [roleID, personID], (err, result) => {
                if (err) {
                    reject(new Error("error inserting new employee into db" + err)); //new error allows me to customise the error note for 'reject' syntax
                } else {
                    this.allEmployees().then(resolve).catch(err => {
                        reject(new Error("error retrieving updated role db" + err)); //customised error on reject here to track where code can break
                    })
                };
            });
        })
    };
};

class ListFunctions {
    //mysql async function for extracting department names from table. names on DEPARTAMENT table can be
    //extended by user as an option, therefore this data can change and must be dynamically 
    //populated into the inquirer module also. We must also have the dept ID in order to use this to update ROLES table
    static async fetchDepartmentData() {
        try {
            const [departments] = await connection.execute('SELECT id, name FROM DEPARTMENT');
            const deptChoices = departments.map(dept => ({
                name: dept.name, //what the user sees
                value: dept.id //what the value of the choice returns
            }));
            return deptChoices;

        } catch (err) {
            console.error('Error fetching departments data:', err);
            return []; //empty array returned as a fallback in case of error 
        }
    };

    static async fetchRoleData() {
        try {
            const [roles] = await connection.execute('SELECT id, title FROM ROLE');
            const roleChoices = roles.map(role => ({
                name: role.title, //what the user sees
                value: role.id // the value returned from the choice
            })); return roleChoices;

        } catch (err) {
            console.error('Error fetching roles data', err);
            return []; //empty array returned as a fallback in case of error 
        }
    };

    //this function is used to list all the employees by first and last name, and assign them their id primary key value
    //this is used for the list option of assigning a manager to a new employee as well as updating an employee role
    static async fetchEmployeeData() {
        try {
            const [employees] = await connection.execute('SELECT id, first_name, last_name FROM EMPLOYEES');
            const allEmployees = employees.map(person => ({
                name: `${person.first_name} ${person.last_name}`,  //what the user sees
                value: person.id // the value returned from the choice
            }));

            return allEmployees;

        } catch (err) {
            console.error('Error fetching roles data', err);
            return []; //empty array returned as a fallback in case of error 
        }
    };
};

module.exports = { Database, ListFunctions };
