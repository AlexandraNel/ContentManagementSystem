const password = process.env.password;
const mysql = require('mysql2');

//Create a connection to our sql database. Connection will be stores in variable db
const db = mysql.createConnection(
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
  
  module.exports = { db };