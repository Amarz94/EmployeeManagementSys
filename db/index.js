const connection = require("./connection")

class DB {
    constructor(connection) {
        this.connection = connection
    }

    findAllEmp() {
        return this.connection.query(
          "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }
    
    findAllDepart() {
        return this.connection.query(
          "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name"
        );
    }

    findAllEmpByDepart(departmentId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
            departmentId
        );
    }

    findAllEmpByMan(managerId) {
        return this.connection.query(
          "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
          managerId
        );
    }

    createEmp(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }

    removeEmp(employeeId) {
        return this.connection.query(
          "DELETE FROM employee WHERE id = ?",
          employeeId
        );
    }

    findAllRoles() {
        return this.connection.query(
          "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    updateEmpRole(employeeId, roleId) {
        return this.connection.query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
          [roleId, employeeId]
        );
    }

    updateEmpMan(employeeId, managerId) {
        return this.connection.query(
          "UPDATE employee SET manager_id = ? WHERE id = ?",
          [managerId, employeeId]
        );
    }

    findAllPossMan(employeeId) {
        return this.connection.query(
          "SELECT id, first_name, last_name FROM employee WHERE id != ?",
          employeeId
        );
    }

    createDepart(department) {
        return this.connection.query("INSERT INTO department SET ?", department);
    }

    removeDepart(departmentId) {
        return this.connection.query(
          "DELETE FROM department WHERE id = ?",
          departmentId
        );
    }

    createRole(role) {
        return this.connection.query("INSERT INTO role SET ?", role);
    }

    removeRole(roleId) {
        return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
    }

}
module.exports = new DB(connection);