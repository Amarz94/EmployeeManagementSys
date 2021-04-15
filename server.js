const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

startUp();

function startUp () {
    const { choice } =  prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do",
            choices: [
                {
                    name: "View Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View Employees by Department",
                    value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
                },
                {
                    name: "View Employees By Manager",
                    value: "VIEW_EMPLOYEES_BY_MANAGER"
                },
                {
                    name: "Add Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Remove Employee",
                    value: "REMOVE_EMPLOYEES"
                },
                {
                    name: "Update Role Of Employee",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Update Manager Of Employee",
                    value: "UPDATE_EMPLOYEE_MANAGER"
                },
                {
                    name: "View Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Remove Role",
                    value: "REMOVE_ROLE"
                },
                {
                    name: "View Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Remove Department",
                    value: "REMOVE_DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }               
            ]
        }
    ]);

    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmp();
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            return viewEmpByDepart();
        case "VIEW_EMPLOYEES_BY_MANAGER":
            return;
        case "ADD_EMPLOYEE":
            return;
        case "REMOVE_EMPLOYEE":
            return;
        case "UPDATE_EMPLOYEE_ROLE":
            return;
        case "UPDATE_EMPLOYEE_MANAGER":
            return;
        case "VIEW_DEPARTMENTS":
            return;
        case "ADD_DEPARTMENT":
            return;
        case "REMOVE_DEPARTMENT":
            return;
        case "VIEW_ROLES":
            return;
        case "ADD_ROLE":
            return;
        case "REMOVE_ROLE":
            return;
        case "QUIT":
            return;
            
    }

    async function viewEmp() {
        const employees = await db.findAllEmp();
      
        console.log("\n");
        console.table(employees);
      
        startUp();
      };

    async function viewEmpByDepart() {
        const departments = await db.findAllDepart();
        const departChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }));

        const { departmentId } = await prompt([
            {
              type: "list",
              name: "departmentId",
              message: "Which department?",
              choices: departChoices
            }
          ]);
          const employees = await db.findAllEmpByDepart(departmentId);

          console.log("\n");
          console.table(employees);
        
          startUp();
    }

}