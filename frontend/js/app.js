const API_URL =
    'http://localhost:5000/api/bookings';

const seatsContainer =
    document.getElementById(
        'seatsContainer'
    );

const bookBtn =
    document.getElementById(
        'bookBtn'
    );

const movieTitle =
    document.getElementById(
        'movieTitle'
    );


// ==========================================
// GET USER
// ==========================================

const username =
    localStorage.getItem(
        'username'
    );

if (!username) {

    alert('Please login first');

    window.location.href =
        'login.html';
}


// ==========================================
// GET MOVIE
// ==========================================

const selectedMovie =
    localStorage.getItem(
        'selectedMovie'
    );

if (!selectedMovie) {

    alert('Please select a movie');

    window.location.href =
        'index.html';
}


// SHOW MOVIE TITLE

if (movieTitle) {

    movieTitle.innerText =
        `${selectedMovie} Seats`;
}


let selectedSeat = null;

let isBookingInProgress = false;


// ==========================================
// FETCH SEATS
// ==========================================

async function fetchSeats() {

    try {

        const response =
            await fetch(
                `${API_URL}/seats/${selectedMovie}`
            );

        const seats =
            await response.json();

        seatsContainer.innerHTML = '';


        // SORT CORRECTLY

        seats.sort((a, b) => {

            const numA =
                parseInt(
                    a.seatNumber.replace(
                        'A',
                        ''
                    )
                );

            const numB =
                parseInt(
                    b.seatNumber.replace(
                        'A',
                        ''
                    )
                );

            return numA - numB;
        });


        // RENDER SEATS

        seats.forEach((seat) => {

            const seatDiv =
                document.createElement(
                    'div'
                );

            seatDiv.classList.add(
                'seat'
            );

            seatDiv.innerText =
                seat.seatNumber;


            // BOOKED

            if (seat.isBooked) {

                seatDiv.classList.add(
                    'booked'
                );

            } else {

                seatDiv.addEventListener(
                    'click',
                    () => {

                        document
                            .querySelectorAll(
                                '.seat'
                            )
                            .forEach((s) => {

                                s.classList.remove(
                                    'selected'
                                );
                            });

                        seatDiv.classList.add(
                            'selected'
                        );

                        selectedSeat =
                            seat.seatNumber;
                    }
                );
            }

            seatsContainer.appendChild(
                seatDiv
            );
        });

    } catch (error) {

        console.log(error);

        alert(
            'Failed to load seats'
        );
    }
}


// ==========================================
// BOOK SEAT
// ==========================================

bookBtn.addEventListener(
    'click',
    async () => {

        if (!selectedSeat) {

            alert(
                'Please select a seat'
            );

            return;
        }

        if (isBookingInProgress)
            return;

        isBookingInProgress = true;

        bookBtn.disabled = true;

        bookBtn.innerText =
            'Booking...';

        try {

            const response =
                await fetch(
                    `${API_URL}/book`,
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({

                            movieName:
                                selectedMovie,

                            seatNumber:
                                selectedSeat,

                            username
                        })
                    }
                );

            const data =
                await response.json();

            alert(data.message);

            fetchSeats();

        } catch (error) {

            console.log(error);

            alert(
                'Booking failed'
            );
        }

        isBookingInProgress = false;

        bookBtn.disabled = false;

        bookBtn.innerText =
            'Book Seat';
    }
);


// INITIAL LOAD

fetchSeats();