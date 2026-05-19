const Seat = require("../models/Seat");
const redisClient = require("../config/redis");


// ==========================================
// GET ALL SEATS
// ==========================================

const getSeats = async (req, res) => {

    try {

        const { movieName } =
            req.params;

        const seats =
            await Seat.find({
                movieName
            });

        res.json(seats);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// ==========================================
// BOOK SEAT WITH DISTRIBUTED LOCKING
// ==========================================

const bookSeat = async (req, res) => {

    const {
        movieName,
        seatNumber,
        username
    } = req.body;

    const lockKey =
        `lock:${movieName}:${seatNumber}`;

    let lockAcquired = false;

    try {

        const lock =
            await redisClient.set(
                lockKey,
                username,
                {
                    NX: true,
                    PX: 5000
                }
            );

        if (!lock) {

            return res.status(423).json({
                message:
                    'Seat is currently being booked by another user'
            });
        }

        lockAcquired = true;

        const seat =
            await Seat.findOne({

                movieName,

                seatNumber
            });

        if (!seat) {

            return res.status(404).json({
                message: 'Seat not found'
            });
        }

        if (seat.isBooked) {

            return res.status(400).json({
                message:
                    'Seat already booked'
            });
        }

        seat.isBooked = true;

        seat.bookedBy = username;

        await seat.save();

        return res.status(200).json({

            message:
                'Seat booked successfully',

            seat
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: 'Booking failed'
        });

    } finally {

        if (
            lockAcquired &&
            redisClient.isOpen
        ) {

            await redisClient.del(
                lockKey
            );
        }
    }
};

// ==========================================
// GET USER BOOKINGS
// ==========================================

const getUserBookings = async (req, res) => {

    try {

        const { username } = req.params;

        const bookings = await Seat.find({
            bookedBy: username
        });

        res.json(bookings);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};
const cancelBooking = async (req, res) => {

    try {

        const {
            seatNumber,
            movieName
        } = req.body;

        const seat =
            await Seat.findOne({

                seatNumber,
                movieName
            });

        if (!seat) {

            return res.status(404).json({
                message: 'Seat not found'
            });
        }

        seat.isBooked = false;

        seat.bookedBy = null;

        await seat.save();

        res.json({
            message:
                'Booking cancelled successfully'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                'Cancel booking failed'
        });
    }
};

module.exports = {
    getSeats,
    bookSeat,
    getUserBookings,
    cancelBooking
};