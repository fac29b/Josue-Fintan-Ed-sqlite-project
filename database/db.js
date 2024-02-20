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
  try {
    stmt.run(title, content, authorId);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// Function remove posts
function removePosts(db, authorId, postId) {
  const stmt = db.prepare(
    "DELETE FROM Posts WHERE author_id = ? AND post_id = ?"
  );
  try {
    stmt.run(authorId, postId);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// Function remove posts
function updatePost(db, authorId, postId, title, content) {
  const stmt = db.prepare(
    "UPDATE Posts SET title = ?, content = ? WHERE author_id = ? AND post_id = ?"
  );
  try {
    stmt.run(title, content, authorId, postId);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

// Function to insert a new post into the Posts table
function retrieveUserData(db, userId) {
  const stmt = db.prepare("SELECT * FROM Posts WHERE author_id = ?");
  try {
    return { success: true, userPostData: stmt.all(userId) };
  } catch (error) {
    return { success: false };
  }
}

// Function to insert a new post into the Posts table
function retrieveUserSinglePost(db, userId, postId) {
  const stmt = db.prepare(
    "SELECT * FROM Posts WHERE author_id = ? AND post_id = ?"
  );
  try {
    return { success: true, userPostData: stmt.all(userId, postId) };
  } catch (error) {
    return { success: false };
  }
}

// Function to retrieve a user by username and password
function getUserByUsernameAndPassword(db, username, password) {
  const stmt = db.prepare(
    "SELECT user_id, username FROM Users WHERE username = ? AND password = ?"
  );
  try {
    const userData = stmt.get(username, password);
    if (userData) {
      return { success: true, userData };
    } else {
      return { success: false, error: "User not found" };
    }
  } catch (error) {
    return { success: false };
  }
}

module.exports = {
  initializeDatabase,
  insertUser,
  insertPost,
  getUserByUsernameAndPassword,
  retrieveUserData,
  removePosts,
  retrieveUserSinglePost,
  updatePost,
};
