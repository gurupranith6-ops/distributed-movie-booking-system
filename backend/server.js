const http = require('http');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);

// Connect to MongoDB and Redis before accepting requests
connectDB();
connectRedis();

// Initialize Socket.IO for real-time synchronization across clients
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// Make Socket.IO available to controllers via app locals
app.set('io', io);

// Enable CORS so frontend apps can call this backend
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Mount authentication routes under /api/auth
app.use('/api/auth', authRoutes);

// Mount booking routes under /api/bookings
app.use('/api/bookings', bookingRoutes);

// Simple root route for health check
app.get('/', (req, res) => {
  res.send('Distributed Booking Server Running');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});