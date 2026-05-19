require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = require('./config/db');

const Seat = require('./models/Seat');

const movies = [

    'Avengers',
    'Batman',
    'Interstellar',
    'Joker',
    'Avatar',
    'Oppenheimer',
    'Dune',
    'Inception',
    'John Wick',
    'Spider-Man'
];

const seedSeats = async () => {

    try {

        await connectDB();

        // DELETE OLD SEATS

        await Seat.deleteMany();

        const seats = [];

        // CREATE 20 SEATS FOR EACH MOVIE

        movies.forEach((movie) => {

            for (let i = 1; i <= 20; i++) {

                seats.push({

                    movieName: movie,

                    seatNumber: `A${i}`,

                    isBooked: false,

                    bookedBy: null
                });
            }
        });

        await Seat.insertMany(seats);

        console.log(
            'Seats seeded successfully'
        );

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);
    }
};

seedSeats();