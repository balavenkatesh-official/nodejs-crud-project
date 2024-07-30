const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'crud_user',
    password: 'apXkmR8oe1XICXL',
    database: 'crud_demo'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL Database');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// Create
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const insertQuery = `INSERT INTO users (name, email) VALUES (?, ?)`;
    db.query(insertQuery, [name, email], (err, result) => {
        if (err) throw err;
        res.send('User added successfully');
    });
});

// Read
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Update
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    const updateQuery = `UPDATE users SET name=?, email=? WHERE id=?`;
    db.query(updateQuery, [name, email, userId], (err, result) => {
        if (err) throw err;
        res.send('User updated successfully');
    });
});

// Delete
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const deleteQuery = `DELETE FROM users WHERE id=?`;
    db.query(deleteQuery, [userId], (err, result) => {
        if (err) throw err;
        res.send('User deleted successfully');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
