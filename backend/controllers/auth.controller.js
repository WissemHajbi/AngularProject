const authService = require('../services/auth.service');

function login(req, res) {
  const { username, password } = req.body;
  authService.login(username, password, (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user) return res.status(401).json({ message: 'Invalid username or password' });
    res.json(user);
  });
}

module.exports = { login };
