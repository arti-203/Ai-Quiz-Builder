require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const socketManager = require('./utils/socketManager');

const app = express();
const server = http.createServer(app);
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

const io = socketio(server, {
  cors: corsOptions,
});

connectDB();

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/quiz', apiRoutes);

socketManager(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
