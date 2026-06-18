const db = require("../database");

function login(username, password, callback) {
  db.get(
    "SELECT id, username, role FROM users WHERE username = ? AND password = ?",
    [username, password],
    callback,
  );
}

module.exports = { login };
