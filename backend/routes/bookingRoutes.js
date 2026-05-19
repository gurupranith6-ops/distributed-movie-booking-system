const express = require('express');

const router = express.Router();

const bookingController =
    require('../controllers/bookingController');


router.get(
    '/seats/:movieName',
    bookingController.getSeats
);

router.post(
    '/book',
    bookingController.bookSeat
);

router.get(
    '/user/:username',
    bookingController.getUserBookings
);

router.post(
    '/cancel',
    bookingController.cancelBooking
);

module.exports = router;