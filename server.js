const express = require("express");
const path = require("path");
const fs = require("fs");
// Package to create unique id's
const uniqid = require("uniqid");
// Notes database
const databaseFile = "./db/db.json";

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Get the notes database
app.get("/api/notes", (req, res) => {
  fs.readFile(databaseFile, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      return res.json(JSON.parse(data));
    }
  });
});

// Write Notes
const writeNotes = (res, db) => {
  fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
    if (err) {
      console.log(err);
    } else {
      return res.json(db);
    }
  });
};

// Add new note with a unique ID
const newNote = (request) => {
  const notesData = request.body;
  notesData["id"] = uniqid();
  return notesData;
};

// Saving the notes
app.post("/api/notes", (req, res) => {
  // Read database
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Add new note to database
      database = JSON.parse(data);
      database.push(newNote(req));
      // Write notes
      writeNotes(res, database);
    }
  });
});

// Deleting the notes
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const db = JSON.parse(data);
      const noteId = req.params.id;
      // Loop through to find element to delete
      db.forEach((note, index) => {
        if (noteId === note.id) {
          db.splice(index, 1);
          writeNotes(res, db);
        }
      });
    }
  });
});

// GET Route for 404 page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/404.html"))
);

app.listen(PORT, () => console.log(`App listening at ${PORT} 🚀`));
