const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from public folder
app.use(express.static('public'));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API to list files
app.get('/api/files', (req, res) => {
  const dirPath = path.join(__dirname, 'public');
  fs.readdir(dirPath, (err, files) => {
    if (err) return res.status(500).send('Failed to read directory');
    const filtered = files.filter(file => /\.(pdf|jpe?g|png|gif|bmp|webp|svg)$/i.test(file));
    res.json(filtered);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
