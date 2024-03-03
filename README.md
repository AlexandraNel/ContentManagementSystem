
# Employee Content Management System
![License Badge](license-badge.svg)
        
## Description

**Motivation:** To easily interact with a mySQL database to add, ammend, and keep track of employees at a multimedia business 

**The Why:** This project was an excercise in establishing and maintaining a mySQL database utilising the terminal via inquirer  

**Problem Solved:** This problem allows anybody atthe company to utilise a simple question and answer interface to interact with their employee database 

**Lessons:** This project was very challenging. I learned code modularisation, static functions within classes, creating and utilising inquirer modules, .env and connecting to a database, mySQL commands and utilising javascript to execute those commands. The biggest challenge was learning the overall flow of the document and how things need to speak to eachother. Another challenge was the difference between callbacks and promises 


## Table of Contents

> 1. Technologies 

> 2. Installation 

> 3. Usage 

> 4. Roadmap 

> 5. Support 

> 6. License 

> 7. Tests 

## Technologies

- VS Code
- Javascript
- MySQL2
- Node
- Inquirer
- dotenv

## Installation

Once the folder is open within VS Code, open an integrated terminal at index.js. 
npm i into the terminal. check package.jsn for all dependencies, you will require node to run this program. 
Making sure you have an .env file within the folder that contains:

HOST=*HOST HERE ie. localhost*
USER= *USER HERE ie. 'root'*
PASSWORD= *YOUR PASSWORD HERE*
DATABASE=cms_db

Once this has been confirmed, within the terminal initialise mySQL by typing (root can be replaced by your user name, if not root)
mysql -u root -p 
Once inside the mysql shell run (making sure that the schema.sql file is at this relative path)
**SOURCE ./db/myschema.sql** 
followed by (making sure that the seeds.sql file is at this rleative path)
**SOURCE ./db/seeds.sql** 

exit the mySQL shell by typing exit

Once npm i has occured for all dependencies, the db has been initiated and you have exited the mySQL shell:
type node index.js into the integrated terminal.
Your inquirer module will then walk you through all the relevant queries for interacting with you db

## Usage

Once you have the node index.js functioning your db will be updated depending on your choices with the questions.
Watch for spelling and syntax when answering the questions

## Roadmap

Currently console.table returns an indexed table, this could be improved
Scope of functionality could be extended

## Support

Alexandra Nel info@alexandranel.com

## Credits

[Alexandra Nel] (https://github.com/AlexandraNel/)
Assistance from MONASH BOOTCAMP lecturers, TA's, Tutors, and chatGPT tutoring 

## License
        
MIT License

## Tests
n/a

