const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(express.static('public'));

app.use(express.json());
app.use(cors());

// SQL Server configuration
const config = {
    user: 'sa',
    password: 'MyStrongPassword123', // ✅ Your actual SA password
    server: 'localhost',
    database: 'LuxuryHavenHotels',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Get all rooms
app.get('/api/rooms', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Room');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching rooms:', err);
        res.status(500).send('Server error');
    }
});

// Get all bookings
app.get('/api/bookings', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Booking');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).send('Server error');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
