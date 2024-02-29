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

  {
    type: 'list',
    name: 'roleDepartment',
    message: 'Please select the DEPARTMENT for the new role.',
    choices: () => fetchDepartmentData()
  }
  ];

//questions passed into prompt. using .then allows the answers to be handled using answers parameter
//switch statements to handle the answers object passed in from questionOne function
//accessing the options of the  answers object requires the key value pair answers.start 
prompt(questionOne).then(async (answers) => {
  switch (answers.start) {
    case 'view all departments':
      try {
        const departments = await dataBase.allDepartments();
        console.log(departments);
      } catch (error) {
        console.error("Error fecthing data", error);
      }

      break;

    case 'view all roles':
      try {
        const departments = await dataBase.allroles();
        console.log(departments);
      } catch (error) {
        console.error("Error fecthing data", error);
      }
      break;

    case 'view all employees':
      try {
        const departments = await dataBase.allemployees();
        console.log(departments);
      } catch (error) {
        console.error("Error fecthing data", error);
      }
      break;
  
    case 'add a department':

      break;

    case 'add a role':
      break;

    case 'add an employee':
      break;
      
    case 'update an employee role':
      break;


  }

});
