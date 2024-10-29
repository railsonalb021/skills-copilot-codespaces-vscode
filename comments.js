// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Load comments from file
let comments = JSON.parse(fs.readFileSync('comments.json'));

// Serve static files
app.use(express.static('public'));

// Parse JSON data
app.use(bodyParser.json());

// Get comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Add comment
app.post('/comments', (req, res) => {
  const newComment = req.body;
  newComment.id = comments.length + 1;
  comments.push(newComment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(newComment);
});

// Start web server
app.listen(3000, () => {
  console.log('Web server started at http://localhost:3000');
});