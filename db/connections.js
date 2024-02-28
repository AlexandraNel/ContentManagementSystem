const password = process.env.password;
const mysql = require('mysql2');

//Create a connection to our sql database. Connection will be stores in variable db
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // password hidden in passwrd env file within ignore files
      password: password,
      database: 'cms_db'
    });

    //connect function allows us to handle errors if the connection is unsucccesful and log if the connection is successful
    db.connect(err => {
      if (err) {
        console.error ("there was a connection error with your database", err);
     return;
      }
      console.log("connected to teh database")
    });
  
  module.exports = { db };