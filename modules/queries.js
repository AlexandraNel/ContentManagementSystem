const mysql = require('mysql2');
const db = require('../db/connections');

// queries are within an exportable class
class dataBase {

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


    static async addEmployee(newFirstName, newLastName, newRoleId) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO employees (first_name, last_name, role_id,  manager_id ) VALUES (?, ?, ?, ?)`,[newFirstName, newLastName, newRoleId], (err, result) => {
                if (err) {
                    reject(new Error("error inserting new employee into db" + err)); //new error allows me to customise the error note for 'reject' syntax
                } else {
                    resolve(result)
                };
            });
        })
    };
};

//mysql async function for extracting department names from table. names on DEPARTAMENT table can be
//extended by user as an option, therefore this data can change and must be dynamically 
//populated into the inquirer module also. We must also have the dept ID in order to use this to update ROLES table
async function fetchDepartmentData() {
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

async function fetchRoletData() {
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


module.exports = dataBase;
module.exports = { fetchDepartmentData, fetchRoletData, fetchemployeeData };