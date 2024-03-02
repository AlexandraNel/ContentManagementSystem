const inquirer = require('inquirer'); //version 8.2.4
const prompt = inquirer.createPromptModule();
const { fetchDepartmentData, dataBase } = require('./modules/queries');
const db = require('./db/connections')


const questionOne =
  [{
    type: 'list',
    name: 'start',
    message: 'Welcome! What would you like to do?',
    choices: [
      'view all departments',
      'view all roles',
      'view all employees',
      'add a department',
      'add a role',
      'add an employee',
      'update an employee role']
  }];

const QDepartments =
  [{
    type: 'input',
    name: 'newDepartment',
    message: 'Please add the name of the new department, being careful to check the correct spelling.'
  }];

const QRole =

  [{
    type: 'input',
    name: 'newRoleName',
    message: 'Please add the NAME of the new role, being careful to check the correct spelling.',
  },

  {
    type: 'input',
    name: 'newRoleSalary',
    message: 'Please add the SALARY of the new role, being careful to check the correct figure.',
  },
  //this question will return the user a list of choices based on the updated department list using function
  //within the queries.js file. This ensures that the department options are always dynamically updated
  {
    type: 'list',
    name: 'roleDepartment',
    message: 'Please select the DEPARTMENT for the new role.',
    choices: () => fetchDepartmentData()
  }
  ];

// enter the employee’s first name, last name, role, and manager, and that employee is added to the database

const QEmployee =
  [{
    type: 'input',
    name: 'employeeFirstName',
    message: 'Please add the FIRST NAME of the new employee, being careful to check the correct spelling.',
  },
  {
    type: 'input',
    name: 'employeeLastName',
    message: 'Please add the LAST NAME of the new employee, being careful to check the correct spelling.',
  },
  {
    type: 'list',
    name: 'employeeRole',
    message: 'Please select the DEPARTMENT for the new role.',
    choices: () => fetchRoletData()
  },
    // first_name
    // last_name
    // role_id
    // manager_id
  }];

const QEmployeeRole =
  [{

  }];

//I have wrapped my inquirer Q1 prompt in an async function rather than using .then as I find it easier
// to read and handle this way. I am using a switch statement to manage the choices object/array of questionOne
// 
// I utilise my database class that I have imported for from queries.js for mysql db interaction/calls
//accessing the options of the  answers object requires the key value pair ie. answers.start
async function handleQuestionOne() {

  try {

    const answers = prompt(questionOne);

    switch (answers.start) {

      case 'view all departments':

        try {
          const departments = await dataBase.allDepartments();
          console.table(departments);
        } catch (error) {
          console.error("Error fecthing data", error);
        }

        break;
      //uses static async in queries.js class dataBase to retrieve roles from mysql db

      case 'view all roles':

        try {
          const roles = await dataBase.allroles();
          console.table(roles);
        } catch (error) {
          console.error("Error fecthing data", error);
        }
        break;

      //uses static async in queries.js class dataBase to retirve roles from mysql db
      case 'view all employees':

        try {
          const employees = await dataBase.allemployees();
          console.table(employees);
        } catch (error) {
          console.error("Error fecthing data", error);
        }
        break;

      //becomes more complex with this option, my try block now delivers the user to other related functions which allow
      // the use of further inquirer prompt modules using async/await sytanx. This then allows database updates utilising the
      //queries.js dataBase class, and returns relative updated tables. 
      case 'add a department':

        try {
          const inputDept = await departmentHandler();
          const updatedDeptTable = await dataBase.addDepartment(inputDept);
          console.table(updatedDeptTable)
        }
        catch (err) {
          console.error("Error adding dept", err);
        }
        break;


      case 'add a role':
        //using the roleHandler to manage the mulitple inputs from the inquierer question and turn them into an object
        //that object is then used to pass the new user input ROLE data into the queries.js class that manages the mysql commands
        try {
          const inputRole = await roleHandler();
          const updatedRoleTable = await dataBase.addRole(inputRole.roleName, inputRole.roleSalary, inputRole.roleDeptId);
          console.table(updatedRoleTable);
        } catch (err) {
          console.error("Error adding role", err);
        }
        break;

        case 'add an employee':
        //using the roleHandler to manage the mulitple inputs from the inquierer question and turn them into an object
        //that object is then used to pass the new user input ROLE data into the queries.js class that manages the mysql commands
        try {
          const inputPerson = await employeeHandler();
          const updatedEmployeeTable = await dataBase.addEmployee(inputPerson.newFirstName, inputPerson.newLastName, inputPerson.newRoleId);
          console.table(updatedEmployeeTable);
        } catch (err) {
          console.error("Error adding employee", err);
        }
        break;

      case 'update an employee role':
        break;


    }
  }};

//departmentHandler delivers the departments question for inquirer to the user
//retrieves the user input on the newDepartment Q object
//returns the user input for use
async function departmentHandler() {

  try {
    const addDepartmentQuestions = await prompt(QDepartments);
    const userDepartment = addDepartmentQuestions.newDepartment;
    return userDepartment;
  } catch (err) {
    console.error("failed to process user input", err);
  }
};

//this function will take each answer from the QRole inquirer module and pass them into an obeject
//I decided to use an object with key/value pairs rather than an array for useability of the data
//this way teh order of teh returned data is not essential
async function roleHandler() {

  try {
    const addRoleQuestions = await prompt(QRole);
    const userRole = {
      roleName: addRoleQuestions.newRoleName,
      roleSalary: addRoleQuestions.newRoleSalary,
      roleDeptId: addRoleQuestions.roleDepartment
    };
    return userRole;
  } catch (err) {
    console.error("failed to process user input", err);

  };
}

async function employeeHandler() {
  try {
    const addEmployeeQuestions = await prompt(QEmployee);
    const newPerson = {
      newFirstName: addEmployeeQuestions.employeeFirstName,
      newLastName: addEmployeeQuestions.employeeLastName,
      newRoleId: addEmployeeQuestions.employeeRole
    };
    return newPerson;

  } catch (err) {
    console.error("failed to process user input", err);
   };
};