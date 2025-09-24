require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const requestRoutes = require('./routes/requests');

const app = express(); // <-- initialize app first

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB(process.env.MONGODB_URI);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/requests', requestRoutes); // <-- now it works

// Test route
app.get('/', (req, res) => res.send('BookSwap API'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.use(cors({
  origin: ['http://localhost:5173', 'https://book-swap-marketplace-ten.vercel.app'],
  credentials: true
}));