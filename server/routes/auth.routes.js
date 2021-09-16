const express = require('express');

const router = express.Router();

// login expects email/password
// successful login returns email and a fake token (if we ever want to use it)
router.post('/login', (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(401).json({ success: false, error: 'Bad login information' });
      return;
    }
    res.status(200).json({ success: true, email: req.body.email, token: '12345luggage' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Unknown error' });
  }
})

module.exports = router;