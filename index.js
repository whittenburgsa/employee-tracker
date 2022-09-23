const mysql = require("mysql2");
const inquirer = require("inquirer");
const utils = require("util");
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
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Update an employee role", "Quit"]


        }
    ]).then(answer => {
        if (answer.choice === "View all departments") {
            viewAllDepartments()
        }
        else if (answer.choice === "View all roles") {
            viewAllRoles()
        }
        else if (answer.choice === "View all employees") {

        }
        else if (answer.choice === "Add a department") {

        }
        else if (answer.choice === "Add a role") {

        }
        else if (answer.choice === "Update an employee role") {

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
    const roles = await connection.query("Select * from role")
    console.table(roles)
    prompts()
}

prompts()