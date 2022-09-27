const mysql = require("mysql2");
const inquirer = require("inquirer");
const utils = require("util");
const { async } = require("rxjs");
//require ("console.table")

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeesDB"
})
connection.query = utils.promisify(connection.query)

function prompts() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"]


        }
    ]).then(answer => {
        if (answer.choice === "View all departments") {
            viewAllDepartments()
        }
        else if (answer.choice === "View all roles") {
            viewAllRoles()
        }
        else if (answer.choice === "View all employees") {
            viewAllEmployees()
        }
        else if (answer.choice === "Add a department") {
            addDepartment()
        }
        else if (answer.choice === "Add a role") {
            addRole()
        }

        else if (answer.choice === "Add an employee") {
            addEmployee()
        }

        else if (answer.choice === "Update an employee role") {
            updateEmployeeRole()
        }
        else {
            process.exit()
        }
    })
}
async function viewAllDepartments() {
    const departments = await connection.query("Select * from department")
    console.table(departments)
    prompts()
}

async function viewAllRoles() {
    const roles = await connection.query("Select role.id, role.title, role.salary, department.name as department_name from role left join department on role.department_id = department.id")
    console.table(roles)
    prompts()
}

async function viewAllEmployees() {
    const employees = await connection.query("Select employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name as department_name, concat(manager.first_name, ' ', manager.last_name) as manager from employee left join role on employee.role_id = role.id left join department on role.department_id = department.id left join employee manager on manager.id = employee.manager_id")
    console.table(employees)
    prompts()
}

async function addDepartment() {
    const answer = await inquirer.prompt([{
        type: 'input',
        name: 'departmentName',
        message: 'Enter name of department'
    }])
    await connection.query("Insert into department (name) values (?)", [answer.departmentName])
    console.log("Your department was successfully added")
    prompts()
}

async function addEmployee() {
    const roles = await connection.query("Select * from employees")
    console.table(employees)
    prompts()
}

async function addRole() {
    const department = await connection.query ("Select * from department")
    const departmentChoices = department.map(department => ({
        value: department.id, name: department.name
    }))
    const answer = await inquirer.prompt([{
        type: 'input',
        name: 'roleName',
        message: 'Enter name of role'
    }, {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for the role?'
    }, {
        type: 'list',
        name: 'departmentId',
        message: 'What is the department?',
        choices: departmentChoices
    }])
    await connection.query("Insert into role (title, salary, department_id) values (?, ?, ?)", [answer.roleName, answer.salary, answer.departmentId])
    console.log ("Your role was successfully added")
    prompts()


    async function updateEmployeeRole() {
        const roles = await connection.query("Select * from employees")
        console.table(employees)
        prompts()
    }
}

prompts()