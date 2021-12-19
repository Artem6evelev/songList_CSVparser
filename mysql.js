const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "artem6eV-)",
  database: "Songs",
});

let query = "";

db.connect((err) => {
  if (err) throw err;
  console.log("Connection Successful!");

  query = "DROP TABLE IF EXISTS SONGS";
  executeQuery(query, "Songs table dropped!");

  query =
    "CREATE TABLE songs (id int AUTO_INCREMENT, artist VARCHAR(255), year INT, title VARCHAR(255),  PRIMARY KEY (id))";
  executeQuery(query, "Songs table created!");

  query =
    "LOAD DATA LOCAL INFILE 'csv/songTable.csv' INTO TABLE songs FIELDS TERMINATED BY ',' IGNORE 1 LINES " +
    "(title, artist, year)";
  executeQuery(query, "Songs table loaded!");

  db.end((err) => {
    if (err) throw err;
    console.log("All done! Closing the database connection");
  });
});

function executeQuery(query, msg) {
  db.query(query, (err) => {
    if (err) throw err;
    console.log(msg);
  });
}
