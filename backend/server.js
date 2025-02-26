const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: 'http://localhost:8080', // Allow only this origin
    methods: ['GET', 'POST'], // Allow only GET and POST requests
    credentials: true, // Allow cookies and credentials
}));
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to the Skill Matching Website Backend!');
});

// Routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});