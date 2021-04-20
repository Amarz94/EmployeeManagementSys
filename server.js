const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

startUp();

async function startUp () {
    const { choice } = await prompt([
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
            return viewEmpByMan();
        case "ADD_EMPLOYEE":
            return addEmp();
        case "REMOVE_EMPLOYEE":
            return removeEmp();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmpRole();
        case "UPDATE_EMPLOYEE_MANAGER":
            return updateEmpMan();
        case "VIEW_DEPARTMENTS":
            return viewDepart();
        case "ADD_DEPARTMENT":
            return addDepart();
        case "REMOVE_DEPARTMENT":
            return removeDepart();
        case "VIEW_ROLES":
            return viewRoles();
        case "ADD_ROLE":
            return addRole();
        case "REMOVE_ROLE":
            return removeRole();
        case "QUIT":
            return quit();
            
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

    async function viewEmpByMan() {
        const managers = await db.findAllEmp();
      
        const managerChoices = managers.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
      
        const { managerId } = await prompt([
          {
            type: "list",
            name: "managerId",
            message: "Which employee do you want to see direct reports for?",
            choices: managerChoices
          }
        ]);
      
        const employees = await db.findAllEmpByMan(managerId);
      
        console.log("\n");
      
        if (employees.length === 0) {
          console.log("The selected employee has no direct reports");
        } else {
          console.table(employees);
        }
      
        startUp();
    }

    async function addEmp() {
        const roles = await db.findAllRoles();
        const employees = await db.findAllEmp();
      
        const employee = await prompt([
          {
            name: "first_name",
            message: "What is their first name?"
          },
          {
            name: "last_name",
            message: "What is their last name?"
          }
        ]);
      
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id
        }));
      
        const { roleId } = await prompt({
          type: "list",
          name: "roleId",
          message: "What is their role?",
          choices: roleChoices
        });
      
        employee.role_id = roleId;
      
        const managerChoices = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
        managerChoices.unshift({ name: "None", value: null });
      
        const { managerId } = await prompt({
          type: "list",
          name: "managerId",
          message: "Who is the employee's manager?",
          choices: managerChoices
        });
      
        employee.manager_id = managerId;
      
        await db.createEmp(employee);
      
        console.log(
          `Added ${employee.first_name} ${employee.last_name} to the database`
        );
      
        startUp();
    }

    async function removeEmp() {
        const employees = await db.findAllEmp();
      
        const empChoices = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
      
        const { employeeId } = await prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Which employee do you want to removed?",
            choices: empChoices
          }
        ]);
      
        await db.removeEmp(employeeId);
      
        console.log("Removed selected employee");
      
        startUp();
    }

    async function updateEmpRole() {
        const employees = await db.findAllEmp();
      
        const empChoices = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
      
        const { employeeId } = await prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Which employee's role do you want to update?",
            choices: empChoices
          }
        ]);
      
        const roles = await db.findAllRoles();
      
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id
        }));
      
        const { roleId } = await prompt([
          {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
          }
        ]);
      
        await db.updateEmpRole(employeeId, roleId);
      
        console.log("Updated employee's role");
      
        startUp();
    }

    async function updateEmpMan() {
        const employees = await db.findAllEmp();
      
        const empChoices = employees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
      
        const { employeeId } = await prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Which employee's manager do you want to update?",
            choices: empChoices
          }
        ]);
      
        const managers = await db.findAllPossMan(employeeId);
      
        const managerChoices = managers.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
      
        const { managerId } = await prompt([
          {
            type: "list",
            name: "managerId",
            message:
              "Which employee do you want to set as manager for the selected employee?",
            choices: managerChoices
          }
        ]);
      
        await db.updateEmpMan(employeeId, managerId);
      
        console.log("Updated employee's manager");
      
        startUp();
    }

    async function viewDepart() {
        const departments = await db.findAllDepart();
      
        console.log("\n");
        console.table(departments);
      
        startUp();
    }

    async function addDepart() {
        const department = await prompt([
          {
            name: "name",
            message: "What is the name of the department?"
          }
        ]);
      
        await db.createDepart(department);
      
        console.log(`Added ${department.name} to the database`);
      
        startUp();
    }

    async function removeDepart() {
        const departments = await db.findAllDepart();
      
        const departmentChoices = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));
      
        const { departmentId } = await prompt({
          type: "list",
          name: "departmentId",
          message:
            "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
          choices: departmentChoices
        });
      
        await db.removeDepart(departmentId);
      
        console.log(`Removed department from the database`);
      
        startUp();
    }

    async function viewRoles() {
        const roles = await db.findAllRoles();
      
        console.log("\n");
        console.table(roles);
      
        startUp();
      }

    async function addRole() {
        const departments = await db.findAllDepart();
      
        const departmentChoices = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));
      
        const role = await prompt([
          {
            name: "title",
            message: "What is the name of the role?"
          },
          {
            name: "salary",
            message: "What is the salary of the role?"
          },
          {
            type: "list",
            name: "department_id",
            message: "Which department do you want to assign the role?",
            choices: departmentChoices
          }
        ]);
      
        await db.createRole(role);
      
        console.log(`Added ${role.title} to the database`);
      
        startUp();
    }

    async function removeRole() {
        const roles = await db.findAllRoles();
      
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id
        }));
      
        const { roleId } = await prompt([
          {
            type: "list",
            name: "roleId",
            message:
              "Which role to be removed? (Warning: This will also remove employees)",
            choices: roleChoices
          }
        ]);
      
        await db.removeRole(roleId);
      
        console.log("Removed role");
      
        startUp();
    }

    function quit() {
        console.log("Goodbye!");
        process.exit();
    }

}