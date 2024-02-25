const password = process.env.password;
const inquirer = require('inquirer'); //version 8.2.4
const mysql2 = require('mysql2');
const {allEmployees} = require('./modules/functions');

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


  try {
    const [rows] = await connection.execute('SELECT name FROM DEPARTMENTS');
    return rows.map(row => row.NAME); // Adjusted for potential case sensitivity
} catch (err) {
    console.error('Error fetching departments:', err);
    return [];
} finally {
    await connection.end();
}
}



  db.connection().promise().query(allEmployees())
  const allEmployees = await db.connection().promise().query(allEmployees()).
  console.table(allEmployees);