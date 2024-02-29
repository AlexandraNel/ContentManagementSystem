const mysql = require('mysql2');
const db = require('../db/connections');

// queries are within an exportable class
class dataBase {

    // all departments database query returns a promise result object to be used when called with an async function
    static async allDepartments() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) {
                    reject(err);
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
                    reject(err);
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
                    reject(err);
                } else {
                    resolve(result)
                };
            });
        })
    };


    //add dept database query returns a promise result object to be used when called with an async function
    //i want user input to represent the values required in creating  anew database so will use ? parameters to prevent SQL injections
    //I will then pass teh user input as an array of value sto correspond to these
    static async addDepartment() {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO department (name) VALUES ([?])`, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result)
                };
            });
        })
    };

    //values placeholders kept within an array for update
    static async addRole() {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ([?, ?, ?])`, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result)
                };
            });
        })
    };
    static async addEmployee() {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO employees (first_name, last_name, role_id,  manager_id ) VALUES ([?, ?, ?, ?])`, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result)
                };
            });
        })
    };
};

//mysql async function for extracting department names from table. names on DEPARTAMENT table can be
//extended by user as an option, therefore this data can change and must be dynamically 
//populated into the inquirer module also
async function fetchDepartmentData() {
    try {
        const [QRoleDeptData] = await connection.execute('SELECT name FROM DEPARTMENTS');
        const names = QRoleDeptData.map(row => row.name);
        return names;

    } catch (err) {
        console.error('Error fetching names data:', err);
        return [];
    }
};

module.exports = dataBase;
module.exports = { fetchDepartmentData };