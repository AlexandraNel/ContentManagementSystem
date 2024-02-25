function allEmployees(){    
    return 'SELECT * FROM EMPLOYEES';
};

function allDepartments(){    
    return 'SELECT * FROM DEPARTMENTS';
};

function departmentName(){
    return 'SELECT name FROM DEPARTMENTS'
}

module.exports = { allEmployees, allDepartments, departmentName };