const { app } = require("../router");
const fs = require('fs');
const path = require('path');

const root = (req, res) => {
  const sendFile = (filePath, contentType) => {
    res.setHeader('Content-Type', contentType);
    res.send(fs.readFileSync(filePath, 'utf8'));
  };

  const url = req.url;

  if (url.endsWith('.js')) {
    sendFile(path.join('script.js'), 'application/javascript');
  } else if (url.endsWith('.css')) {
    sendFile(path.join('style.css'), 'text/css');
  } else {
    sendFile(path.join('index.html'), 'text/html');
  }
}
module.exports = root;