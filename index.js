const inquirer = require('inquirer'); //version 8.2.4
const prompt = inquirer.createPromptModule();
const { Database, ListFunctions } = require('./modules/queries');



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
      'update an employee role',
      'Exit']
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
    choices: () => ListFunctions.fetchDepartmentData()
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
    //choices are managed by ListFunction Class in queries.js where we pull potentially updated mysql table data 
    // and present them as the choices in the inquirer list 
    choices: () => ListFunctions.fetchRoleData()
  },
  {
    type: 'list',
    name: 'manager',
    message: 'Please select the MANAGER for this employee.',
    //choices are managed by ListFunction Class in queries.js where we pull potentially updated mysql table data 
    // and present them as the choices in the inquirer list. 
    //I am using a spread operator and an async function here to gather the list options from mysql and add in a NONE option if there is no manager
    choices: () => ListFunctions.fetchEmployeeData()

  }];

const QEmployeeRole =
  [{
    type: 'list',
    name: 'chooseEmployee',
    message: 'Please select the EMPLOYEE whose role requires updating.',
    choices: () => ListFunctions.fetchEmployeeData()
  },
  {
    type: 'list',
    name: 'chooseRole',
    message: 'Please select the NEW ROLE for this Employee.',
    choices: () => ListFunctions.fetchRoleData()
  },
  ];


//I have wrapped my inquirer Q1 prompt in an async function rather than using .then as I find it easier
// to read and handle this way. I am using a switch statement to manage the choices object/array of questionOne
// QuestionOne leads to all other questions on a case by case basis (through the switch/case)
// 
//Simple questions query the database utilising the class Database functions imported from queries.js
//Complex multi-factor questions are managed with handler functions, (below the switch/case) and ListFunctions imported
//from the queries database 
async function handleQuestionOne() {

  try {

    const answers = await prompt(questionOne);
    //answers object is passed through the switch
    switch (answers.start) {
      //simple query uses Database class functions from queries.js
      //returns a table of data
      case 'view all departments':

        try {
          const departments = await Database.allDepartments();
          console.table(departments);
        } catch (error) {
          console.error("Error fecthing data", error);
        }

        break;


      case 'view all roles':
        //simple query uses Database class functions from queries.js
        //returns a table of data
        try {
          const roles = await Database.allroles();
          console.table(roles);
        } catch (error) {
          console.error("Error fecthing data", error);
        }
        break;


      case 'view all employees':
        //simple query uses Database class functions from queries.js
        //returns a table of data
        try {
          const employees = await Database.allEmployees();
          console.table(employees);
        } catch (error) {
          console.error("Error fecthing data", error);
        }
        break;


      case 'add a department':

        //Complex option, utilises handlerFunctions (below switch/case) to manage multiple answers
        // these objects can then be delievered to the DataBase class functions for use in querying the database
        try {
          const inputDept = await departmentHandler();
          const updatedDeptTable = await Database.addDepartment(inputDept);
          console.table(updatedDeptTable)
        }
        catch (err) {
          console.error("Error adding dept", err);
        }
        break;


      case 'add a role':

        //Complex option, utilises handlerFunctions (below switch/case) to manage multiple answers
        // these objects can then be delievered to the DataBase class functions for use in querying the database
        try {
          const inputRole = await roleHandler();
          const updatedRoleTable = await Database.addRole(inputRole.roleName, inputRole.roleSalary, inputRole.roleDeptId);
          console.table(updatedRoleTable);
        } catch (err) {
          console.error("Error adding role", err);
        }
        break;

      case 'add an employee':

        //Complex option, utilises handlerFunctions (below switch/case) to manage multiple answers
        // these objects can then be delievered to the DataBase class functions for use in querying the database
        try {
          const inputPerson = await employeeHandler();
          const updatedEmployeeTable = await Database.addEmployee(inputPerson.newFirstName, inputPerson.newLastName, inputPerson.newId, inputPerson.managerId);
          console.table(updatedEmployeeTable);
        } catch (err) {
          console.error("Error adding employee", err);
        }
        break;


      case 'update an employee role':
        try {
          const personRole = await updateRoleHandler();
          const updatedEmployee = await Database.updateEmployeeRole(personRole.employee, personRole.updatedRole)
          console.table(updatedEmployee);
        } catch (err) {
          console.error("Error updating employee role", err);
        }

        break;

      case 'Exit':

        console.log("exit successful")
        process.exit(0); //exit process

        break;
    }

    //Recursive call here, outside the switch statement, 
    // to ensure it's executed after the switch block has completed
    // but not when 'Exit' is chosen (handled by the return statement above).
    await handleQuestionOne();

  } catch (err) {
    console.error("major issue handleQuestionOne function", err)
  }
};

//departmentHandler delivers the departments question for inquirer to the user
//retrieves the user input on the newDepartment Q object
//returns the user input as an object for use.
//this function is created to manage multiple user input answers that need ot be passed to to the database
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
//this way the order of the returned data is not essential
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
      newId: addEmployeeQuestions.employeeRole,
      managerId: addEmployeeQuestions.manager
    };
    return newPerson;

  } catch (err) {
    console.error("failed to process user input", err);
  };
};

async function updateRoleHandler() {
  try {
    const updateRole = await prompt(QEmployeeRole);
    const newRoleData = {
      employee: updateRole.chooseEmployee,
      updatedRole: updateRole.chooseRole
    }
    return newRoleData;
  } catch (err) {
    console.error("failed to process user input", err)
  }


};

//index.js is initialised
handleQuestionOne();


