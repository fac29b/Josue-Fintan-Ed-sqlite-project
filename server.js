const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("better-sqlite3");
require("dotenv").config();

const {
  initializeDatabase,
  insertUser,
  insertPost,
  getUserByUsernameAndPassword,
  retrieveUserData,
} = require("./database/db");

// Initialize database
const blogDatabase = initializeDatabase(process.env.BLOG_DB);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.js"));
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

app.post("/login", express.json(), (req, res) => {
  const { username, password } = req.body;
  const user = getUserByUsernameAndPassword(blogDatabase, username, password);
  if (user) {
    res.status(200).json({ message: "Login successful." });
  } else {
    res.status(401).json({ error: "Invalid username or password." });
  }
});

app.post("/register", express.json(), (req, res) => {
  const { username, password } = req.body;
  const userExist = insertUser(blogDatabase, username, password);
  if (userExist) {
    res
      .status(200)
      .json({ success: true, message: "Registration successful." });
  } else {
    res.status(409).json({ success: false, error: "Username already taken." });
  }
});

app.post("/logout", (req, res) => {
  res.redirect("/");
});

app.post("/newpost", (req, res) => {
  res.redirect("/home");
});

app.post("/retrieveUserData", express.json(), (req, res) => {
  console.log(req);
  const username = retrieveUserData(blogDatabase, req.username);
  res.send({ username: username });
});

app.listen(port, () => {
  console.log(`Simple Blog app listening at http://localhost:${port}`);
});
