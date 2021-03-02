
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "pooh1994",
    database: "employee_db"

});

module.exports = connection;