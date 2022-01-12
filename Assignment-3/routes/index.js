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

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/store", function (req, res) {
  let chosenStore = req.query.stores;
  con.query(
    `SELECT * FROM game WHERE store_id IN (SELECT store_id FROM store WHERE name = "${chosenStore}")`,
    function (err, result, fields) {
      if (err) throw err;
      // console.log(result);
      res.render("store", { result, chosenStore });
    }
  );
});

router.get("/console", function (req, res) {
  let chosenConsole = req.query.consoles;
  con.query(
    `SELECT * FROM game WHERE platform = "${chosenConsole}"`,
    function (err, result, fields) {
      if (err) throw err;
      // console.log(result);
      res.render("console", { result, chosenConsole });
    }
  );
});

router.get("/genre", function (req, res) {
  let chosenGenre = req.query.genres;
  con.query(
    `SELECT * FROM game WHERE genre = "${chosenGenre}"`,
    function (err, result, fields) {
      if (err) throw err;
      // console.log(result);
      res.render("genre", { result, chosenGenre });
    }
  );
});

router.get("/users", function (req, res) {
  let chosenUser = req.query.users;
  con.query(
    `SELECT * FROM game WHERE store_id IN (SELECT store_id FROM store WHERE address IN (SELECT address FROM user WHERE name = "${chosenUser}"))`,
    function (err, result, fields) {
      if (err) throw err;
      // console.log(result);
      res.render("user", { result, chosenUser });
    }
  );
});

router.get("/count", function (req, res) {
  con.query(
    `SELECT COUNT(game.game_id) AS countGames, store.name FROM game JOIN store on game.store_id = store.store_id GROUP BY store.name`,
    function (err, result, fields) {
      if (err) throw err;
      // console.log(result);
      res.render("count", { result });
    }
  );
});

router.get("/view", function (req, res) {
  con.query("DROP VIEW gamesAfter17", function (err, result, fields) {
    if (err) throw err;
  });
  con.query(
    `CREATE VIEW gamesAfter17 AS SELECT title, platform, release_year, genre, description FROM game WHERE release_year > "2017"`,
    function (err, result, fields) {
      if (err) throw err;
    }
  );
  con.query("SELECT * FROM gamesAfter17", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.render("view", { result });
  });
});
module.exports = router;
