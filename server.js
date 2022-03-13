const express = require("express");
const path = require("path");
const fs = require("fs");
// Package to create unique id's
const uniqid = require("uniqid");
// Notes database
const notesData = require("./db/db.json");

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
app.get("/api/notes", (req, res) => res.json(notesData));

// GET Route for 404 page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/404.html"))
);

app.listen(PORT, () => console.log(`App listening at ${PORT} 🚀`));

console.log(`Unique ID: ${uniqid()}`);
