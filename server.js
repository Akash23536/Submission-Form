const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
const port = 3000;

// Database configuration
const dbConfig = {
    user: 'sa',
    password: '123@akash',
    server: 'localhost', // Change this to your actual server address if different
    port: 1433, // Default port
    database: 'AkashTest',
    options: {
        encrypt: false,
        enableArithAbort: true
    }
};

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to handle form submission
app.post('/submit', async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig);
        const { name, email } = req.body;
        await pool.request()
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .query('INSERT INTO Login (name, email , LoginTime) VALUES (@name, @Email ,GETDATE())');
        
        res.status(200).send('Data inserted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting data');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
