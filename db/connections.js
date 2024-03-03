require('dotenv').config(); //this connects to my gitignore .env file that hides my db password
const mysql = require('mysql2');

//Create a connection to our sql database. Connection will be stored in variable db
//have added await here and in my index.js as the console.log connected to the database would pop up at the same ime as the inquirer questions
const db = mysql.createConnection(
  {//reeferences credentials from .env in gitignore
    host: process.env.HOST,
    // MySQL username,
    user: process.env.USER,
    // password hidden in passwrd env file within ignore files
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });

//connect function allows us to handle errors if the connection is unsucccesful and log if the connection is successful
db.connect(err => {
  if (err) {
    console.error("there was a connection error with your database", err);
    process.exit(1); // Optionally exit if cannot connect to the database (code discovered when problem shooting)
  
}});

module.exports = { db };
