// /api/routes/signin.js
const path = require('path');

const signin = (req, res) => {
    res.sendFile(path.join(__dirname, '../../', 'register.html')); // Serve login.html file
};

module.exports = signin;
