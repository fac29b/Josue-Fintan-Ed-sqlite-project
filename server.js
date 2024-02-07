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
  if (user.success) {
    res.status(200).json({
      userId: user.userData.user_id,
      username: user.userData.username,
      message: "Login successful.",
    });
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

app.post("/logout", express.json(), (req, res) => {
  res.redirect("/");
});

app.post("/storeNewPost", express.json(), (req, res) => {
  const response = insertPost(
    blogDatabase,
    req.body.postTitle,
    req.body.postContent,
    req.body.userId
  );
  if (response.success) {
    res.status(200).json({ message: "Posted." });
  } else {
    res.status(500).json({ error: "Something went wrong try again." });
  }
});

app.post("/retrieveUserData", express.json(), (req, res) => {
  const userPostData = retrieveUserData(blogDatabase, req.body.userId);
  if (userPostData.success) {
    res.send({ userPostData: userPostData });
  } else {
    res.status(404).json({ success: false, error: "User data not found." });
  }
});

app.listen(port, () => {
  console.log(`Simple Blog app listening at http://localhost:${port}`);
});
