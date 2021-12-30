import mysql from "mysql";
import readLine from "readline";
import fs from "fs";

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "12345678",
  database: "redditDB",
  port: "3306",
});
let start;
let outerSubVal = [];
let outerPostVal = [];
let outerComVal = [];
let count = 0;
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  start = Date.now();
  readAndIn("./RC_2007-10");
});

function readAndIn(jsonFile) {
  const read = readLine.createInterface({
    input: fs.createReadStream(jsonFile),
  });
  read.on("line", (line) => {
    let data = JSON.parse(line);
    insertToDB(data);
    count++;
    console.log(count);
  });

  read.on("close", function () {
    console.log("Completed Data Upload!");
    let end = Date.now();
    console.log(`Time Taken: ${end - start}ms`);
    process.exit(0);
  });
}

function insertToDB(data) {
  const subVal = [data.subreddit_id, data.subreddit];
  const postVal = [data.link_id.split("_")[1], data.link_id, data.subreddit_id];
  const comVal = [
    data.id,
    data.name,
    data.subreddit_id,
    data.parent_id,
    data.link_id.split("_")[1],
    data.author,
    data.body,
    data.score,
    new Date(data.created_utc * 1000),
  ];
  outerSubVal.push(subVal);
  outerPostVal.push(postVal);
  outerComVal.push(comVal);

  if (count % 2500 == 0) {
    connection.query(
      "INSERT IGNORE INTO Subreddit (id, subreddit) VALUES ?",
      [outerSubVal],
      function (err, result) {
        if (err) throw err;
        //console.log("inserted subreddit");
      }
    );

    connection.query(
      "INSERT IGNORE INTO Post (id, name, subreddit_id) VALUES ?",
      [outerPostVal],
      function (err, result) {
        if (err) throw err;
        //console.log("inserted post");
      }
    );

    connection.query(
      "INSERT IGNORE INTO Comment (id, name, subreddit_id, parent_id, link_id, author, body, score, created_utc) VALUES ?",
      [outerComVal],
      function (err, result) {
        if (err) throw err;
        //console.log("inserted comment");
      }
    );
    outerSubVal = [];
    outerPostVal = [];
    outerComVal = [];
  }
}
