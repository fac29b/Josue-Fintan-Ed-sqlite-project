const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

// Function to initialize the database connection
function initializeDatabase(databaseName) {
  const dbFilePath = path.join(__dirname, databaseName);
  const db = new Database(dbFilePath);

  // Read the schema from initializeBlogDatabase.sql file
  const schemaPath = path.join(__dirname, "createusersdb.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  // Execute the schema
  db.exec(schema);

  return db;
}

// Function to insert a new user into the Users table
function insertUser(db, username, password) {
  const stmt = db.prepare(
    "INSERT INTO Users (username, password) VALUES (?, ?)"
  );
  try {
    stmt.run(username, password);
    return true;
  } catch (error) {
    return false;
  }
}

// Function to insert a new post into the Posts table
function insertPost(db, title, content, authorId) {
  const stmt = db.prepare(
    "INSERT INTO Posts (title, content, author_id) VALUES (?, ?, ?)"
  );
  stmt.run(title, content, authorId);
}

// Function to insert a new post into the Posts table
function retrieveUserData(db, username) {
  const stmt = db.prepare("SELECT username FROM Users WHERE username = ?");
  try {
    return { success: true, username: stmt.get(username) };
  } catch (error) {
    return false;
  }
}

// Function to retrieve a user by username and password
function getUserByUsernameAndPassword(db, username, password) {
  const stmt = db.prepare(
    "SELECT * FROM Users WHERE username = ? AND password = ?"
  );
  return stmt.get(username, password);
}

module.exports = {
  initializeDatabase,
  insertUser,
  insertPost,
  getUserByUsernameAndPassword,
  retrieveUserData,
};
