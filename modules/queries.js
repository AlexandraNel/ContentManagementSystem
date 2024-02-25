const inquirer = require('inquirer'); //version 8.2.4
const prompt = inquirer.createPromptModule();
const { fetchDepartmentData } = require('./functions');

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

