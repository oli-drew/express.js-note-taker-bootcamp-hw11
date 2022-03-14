const notes = require("express").Router();
const notesData = require("./db/db.json");
// const fs = require("fs");

// GET Route for retrieving the notes
notes.get("/", (req, res) => {
  //   console.info(`${req.method} request received for note`);
  res.json(notesData);
});

module.exports = notes;
