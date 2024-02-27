
const inquirer = require('inquirer'); //version 8.2.4
const mysql = require('mysql2');
const { allEmployees } = require('./modules/functions');


db.connection().promise().query(allEmployees())

const allEmployees = await db.connection().promise().query(allEmployees()).
  console.table(allEmployees);

