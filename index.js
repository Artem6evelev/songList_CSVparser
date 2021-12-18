const papaparse = require("papaparse");
const fs = require("fs");

const songFilePath = "./csv/song.csv";
const songFile = fs.readFileSync(songFilePath, "utf8");

const songRows = {};

Papa.parse(songFile, {
  header: true,
  skipEmptyLines: true,
  complete: function (results) {
    songRows.data = results.data;
    songRows.errors = results.errors;
    songRows.meta = results.meta;
  },
});

