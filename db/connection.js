const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pooh1994",
  database: "employeedb"
});

connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;