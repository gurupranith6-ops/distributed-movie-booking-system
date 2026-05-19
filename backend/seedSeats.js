const mongoose = require('mongoose');

const dotenv = require('dotenv');

const Seat = require('./models/Seat');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

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

async function seedSeats() {

    try {

        await Seat.deleteMany({});

        for (const movie of movies) {

            const seats = [];

            for (let i = 1; i <= 10; i++) {

                seats.push({

                    movieName: movie,

                    seatNumber: `A${i}`,

                    isBooked: false,

                    bookedBy: null
                });
            }

            await Seat.insertMany(
                seats
            );

            console.log(
                `${movie} seats added`
            );
        }

        console.log(
            'All seats seeded'
        );

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);
    }
}

seedSeats();