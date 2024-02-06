const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/home.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.js"));
});

app.get("/newpost", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "newpost.html"));
});

app.get("/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "styles.css"));
});

// POST

app.post("/login", (req, res) => {
  res.redirect("/home");
});

app.post("/logout", (req, res) => {
  res.redirect("/");
});

app.post("/newpost", (req, res) => {
  res.redirect("/home");
});

app.post("/register", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Simple Blog app listening at http://localhost:${port}`);
});
