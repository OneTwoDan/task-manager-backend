const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Configurar Socket.io
io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
    });
});

module.exports = io;