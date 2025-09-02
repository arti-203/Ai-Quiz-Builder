
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors'); // ✅ ADD THIS
const socketio = require('socket.io');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const socketManager = require('./utils/socketManager');
//const quizRoutes = require('./routes/quizRoutes'); //new route

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// ✅ CORS middleware (must be before routes)
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Add io to request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API Routes
app.use('/api/quiz', apiRoutes);
//app.use('/api/quiz', quizRoutes);  // NOW: /api/quiz/create will work ✅


// Socket.io setup
socketManager(io);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path'); // ✅ Make sure path is imported
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


