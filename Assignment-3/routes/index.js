var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "12345678",
  database: "gamesDB",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to gamesDB!");
});

con.query("SELECT * FROM user", function (err, result, fields) {
  if (err) throw err;
  console.log(result.length);
  router.get("/", function (req, res, next) {
    res.render("index", { result });
  });
});

/* GET home page. */

module.exports = router;
