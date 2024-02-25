const inquirer = require('inquirer'); //version 8.2.4
const mysql2 = require('mysql2');

function allEmployees() {
    return 'SELECT * FROM EMPLOYEES';
};

function allDepartments() {
    return 'SELECT * FROM DEPARTMENTS';
};

function departmentName() {
    return 'SELECT name FROM DEPARTMENTS'
}

//mysql2 async function for extracting department names from table. names on DEPARTAMENT table can be
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

module.exports = { allEmployees, allDepartments, departmentName };
module.exports = { fetchDepartmentData };