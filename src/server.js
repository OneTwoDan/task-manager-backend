const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes');

dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', routes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});