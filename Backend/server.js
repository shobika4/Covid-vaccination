const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySQL@2003',
  database: 'vaccine1234',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes
// Get all locations
app.get('/locations', (req, res) => {
  connection.query('SELECT * FROM locations', (error, results, fields) => {
    if (error) {
      console.error('Error fetching locations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// Book a slot
app.post('/locations/:id', (req, res) => {
  const locationId = req.params.id;
  connection.query('UPDATE locations SET dosages = dosages - 1 WHERE id = ?', [locationId], (error, results, fields) => {
    if (error) {
      console.error('Error booking slot:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.sendStatus(200);
    }
  });
});

// Add a new location
app.post('/locations', (req, res) => {
  const { name, dosages } = req.body;
  connection.query('INSERT INTO locations (name, dosages) VALUES (?, ?)', [name, dosages], (error, results, fields) => {
    if (error) {
      console.error('Error adding location:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.sendStatus(201);
    }
  });
});

// Delete a location
app.delete('/locations/:id', (req, res) => {
  const locationId = req.params.id;
  connection.query('DELETE FROM locations WHERE id = ?', [locationId], (error, results, fields) => {
    if (error) {
      console.error('Error deleting location:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.sendStatus(200);
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
