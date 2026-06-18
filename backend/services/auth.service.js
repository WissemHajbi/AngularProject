// Simple authentication service for school project.
// No JWT, no Passport: just a basic username/password check in SQLite.
const db = require("../database");

function login(username, password, callback) {
  db.get(
    "SELECT id, username, role FROM users WHERE username = ? AND password = ?",
    [username, password],
    callback,
  );
}

module.exports = { login };
