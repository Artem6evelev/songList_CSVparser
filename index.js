const Papa = require("papaparse");
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

console.log(songRows.data);

const songArray = songRows.data.map((row) => {
  const { artist, title, year } = row;
  const edittedTitle = title.replace(/,/g, " ");

  return { title: edittedTitle, artist, year };
});

const songData = Papa.unparse(songArray);
createFile(
  "./csv/songTable.csv",
  songData.toLocaleLowerCase(),
  "Song Table successfully saved!"
);

function createFile(filePath, data, msg) {
  fs.writeFile(filePath, data, (err) => {
    if (err) throw err;
    console.log(msg);
  });
}
