const inquirer = require('inquirer');
const connection = require("./lib/SQL_login");
const commMenChoices = require('./lib/commandMenu');
const questions = require('./lib/questions');
const InquirerFunctions = require('./lib/inquirer');
const SQLquery = require('./lib/SQL_queries');
const inqSel = [
    'input', 'confirm', 'list'
]




function startUp() {

    
    const menuPrompt = new InquirerFunctions(inqSel[2], 'menuChoice', questions.mainMenuPrompt, commMenChoices);
    
    inquirer
        .prompt([menuPrompt.ask()]).then(operation => {

            const query1 = "SELECT role.title FROM role"
            const RolesArrQuery = new SQLquery(query1);
            const depNQuery = "SELECT department.name FROM department";
            const depArrQuery = new SQLquery(depNQuery);

            switch (operation.menuChoice) {

                case commMenChoices[2]:
                    return viewAllEmp();

                case commMenChoices[3]:
                    depArrQuery.queryReturnResult(AllEmpDep);
                    break;

                case commMenChoices[4]:
                    const actSel5 = "VIEW BY MANAGER"
                    dummyArr = [];
                    EmpInfoPrompts(dummyArr, actSel5);
                    break;

                case commMenChoices[5]:
                    RolesArrQuery.getQueryNoRepeats(EmpRole)
                    break;

                case commMenChoices[6]:
                    return AllMan();

                case commMenChoices[11]:
                    const actSel1 = "ADD"
                    RolesArrQuery.getQueryNoRepeats(EmpInfoPrompts, actSel1);

                    break;

                case commMenChoices[12]:
                    const actSel2 = "DELETE"
                    RolesArrQuery.getQueryNoRepeats(EmpInfoPrompts, actSel2);
                    break;

                case commMenChoices[13]:
                    const actSel3 = "UPDATE EMP ROLE"
                    RolesArrQuery.getQueryNoRepeats(EmpInfoPrompts, actSel3);

                    break;

                case commMenChoices[14]:
                    const actSel4 = "UPDATE EMP MANAGER";
                    RolesArrQuery.getQueryNoRepeats(EmpInfoPrompts, actSel4);
                    break;

                case commMenChoices[1]:
                    return AllRoles();

                case commMenChoices[9]:
                    return addRole();

                case commMenChoices[10]:
                    const actSel7 = "DELETE ROLE";
                    RolesArrQuery.getQueryNoRepeats(deleteRole, actSel7);
                    break;
                // return removeRole();

                case commMenChoices[0]:
                    return AllDep();

                case commMenChoices[7]:
                    depArrQuery.queryReturnResult(addDep);
                    break;

                case commMenChoices[8]:
                    depArrQuery.queryReturnResult(removeDep);
                    break;
            }
        })
}

function addEmp(emp_info, managerObjArr) {

    console.log("You've entered employee ADD");


    const queryRoleTitle = "SELECT role.id FROM role WHERE role.title = (?) ;"
    connection.query(queryRoleTitle, emp_info.employee_role, function (err, res) {
        if (err) {
            throw err;
        }
        const RoleId = res[0].id;
        const FName = emp_info.first_name;
        const LName = emp_info.last_name;
        const MName = emp_info.employee_manager.split(" ");
        const empMFName = MName[0];
        const empMLName = MName[1];

        let empManID = 0;

        for (let manager of managerObjArr) {
            if (manager.firstName == empMFName && manager.lastName === empMLName) {
                empManID = manager.ID;
            }}
        
        const queryInsertEmpInfo = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)"
        connection.query(queryInsertEmpInfo, [FName, LName, RoleId, empManID], function (err, res) {
            if (err) {throw err}
            console.log("Employee Added");
            startUp();
        })
    })
}

function addRole() {

    const queryDeps = "SELECT department.name FROM department;"
    connection.query(queryDeps, function (err, res) {

        if (err) throw err

        let depNameArr = []
        for (let i = 0; i < res.length; i++) {
            depNameArr.push(res[i].name)
        }

        const wRole = new InquirerFunctions(inqSel[0], 'role_to_add', questions.newRole)
        const wSal = new InquirerFunctions(inqSel[0], 'role_salary', questions.salary)
        const wdepart = new InquirerFunctions(inqSel[2], 'department', questions.department, depNameArr)


        Promise.all([wRole.ask(), wSal.ask(), wdepart.ask()]).then(prompts => {
            inquirer.prompt(prompts).then(userChoices => {

                const getDepId = `SELECT department.id FROM department WHERE department.name = (?);`
                connection.query(getDepId, userChoices.department, function (err, res) {
                    if (err) {
                        throw err
                    }

                    const addRolequery = `INSERT INTO role (role.title, role.salary, role.department_id)
                                    VALUES ( (?), (?), (?));`
                    const addRole = new SQLquery(addRolequery, [userChoices.role_to_add, userChoices.role_salary, res[0].id]);

                    addRole.update(startUp, "Role added!");
                })
            })
        })
    })
}