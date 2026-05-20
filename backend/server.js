const http = require('http');

const express = require('express');

const cors = require('cors');

const dotenv = require('dotenv');

const { Server } = require('socket.io');

const connectDB = require('./config/db');

const authRoutes =
    require('./routes/authRoutes');

const bookingRoutes =
    require('./routes/bookingRoutes');


// ==========================================
// LOAD ENV VARIABLES
// ==========================================

dotenv.config();


// ==========================================
// INITIALIZE EXPRESS
// ==========================================

const app = express();

const server =
    http.createServer(app);


// ==========================================
// CONNECT DATABASE
// ==========================================

connectDB();


// ==========================================
// SOCKET.IO
// ==========================================

const io = new Server(server, {

    cors: {

        origin: '*',

        methods: ['GET', 'POST']
    }
});


io.on('connection', (socket) => {

    console.log(
        `Socket connected: ${socket.id}`
    );

    socket.on('disconnect', () => {

        console.log(
            `Socket disconnected: ${socket.id}`
        );
    });
});


// ==========================================
// MAKE IO AVAILABLE GLOBALLY
// ==========================================

app.set('io', io);


// ==========================================
// MIDDLEWARES
// ==========================================

app.use(cors());

app.use(express.json());


// ==========================================
// REQUEST LOGGER
// ==========================================

app.use((req, res, next) => {

    console.log(

        `Request handled by Process ID: ${process.pid}`
    );

    next();
});


// ==========================================
// ROUTES
// ==========================================

app.use(
    '/api/auth',
    authRoutes
);

app.use(
    '/api/bookings',
    bookingRoutes
);


// ==========================================
// ROOT ROUTE
// ==========================================

app.get('/', (req, res) => {

    res.send(

        `Distributed Booking Server Running
         | Process ID: ${process.pid}`
    );
});


// ==========================================
// START SERVER
// ==========================================

const PORT =
    process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(

        `Server running on port ${PORT}
         | Process ID: ${process.pid}`
    );
});