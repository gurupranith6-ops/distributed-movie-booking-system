const Seat = require("../models/Seat");



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

    try {

        const {
            movieName,
            seatNumber,
            username
        } = req.body;

        const seat =
            await Seat.findOneAndUpdate(

                {
                    movieName,
                    seatNumber,
                    isBooked: false
                },

                {
                    $set: {
                        isBooked: true,
                        bookedBy: username
                    }
                },

                {
                    new: true
                }
            );

        if (!seat) {

            return res.status(400).json({
                message:
                    'Seat already booked by another user'
            });
        }

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