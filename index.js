const password = process.env.password;
const inquirer = require('inquirer'); //version 8.2.4
const mysql2 = require('mysql2');
const {findallemployees} = require('./query');

//Create a connection to our sql database. Connection will be stores in variable db
const db = mysql2.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: password,
      database: 'cms_db'
    },
    console.log(`Connected to the cms_db database.`)
  );

  inquirer
  .prompt([

  ])

  db.connection().promise().query(findallemployees())
  const allEmployees = await db.connection().promise().query(findAllEmplyees()).
  console.log(allEmployees);