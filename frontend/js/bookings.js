const API_URL =
    'https://movie-booking-backend-knx1.onrender.com';


const bookingsContainer =
    document.getElementById(
        'bookingsContainer'
    );


// ==========================================
// GET LOGGED IN USER
// ==========================================

function getLoggedInUsername() {

    const storedUser =
        localStorage.getItem(
            'user'
        );

    if (storedUser) {

        try {

            const parsed =
                JSON.parse(
                    storedUser
                );

            if (parsed.username) {

                return parsed.username;
            }

        } catch (err) {

            console.log(err);
        }
    }

    return localStorage.getItem(
        'username'
    );
}


// ==========================================
// FETCH BOOKINGS
// ==========================================

async function fetchBookings() {

    try {

        const username =
            getLoggedInUsername();

        if (!username) {

            bookingsContainer.innerHTML =
                `
                <h2>
                    Please login first
                </h2>
                `;

            return;
        }

        const response =
            await fetch(
                `${API_URL}/api/bookings/user/${username}`
            );

        const bookings =
            await response.json();

        bookingsContainer.innerHTML =
            '';


        // NO BOOKINGS

        if (bookings.length === 0) {

            bookingsContainer.innerHTML =
                `
                <h2>
                    No bookings yet
                </h2>
                `;

            return;
        }


        // RENDER BOOKINGS

        bookings.forEach((seat) => {

            const div =
                document.createElement(
                    'div'
                );

            div.classList.add(
                'booking-card'
            );

            div.innerHTML = `

                <h2>
                    🎬 ${seat.movieName}
                </h2>

                <h3>
                    Seat: ${seat.seatNumber}
                </h3>

                <p>
                    Booking By:
                    <strong>
                        ${seat.bookedBy}
                    </strong>
                </p>

                <button
                    onclick="cancelBooking('${seat.seatNumber}', '${seat.movieName}')"
                    class="cancel-btn"
                >
                    Cancel Booking
                </button>
            `;

            bookingsContainer.appendChild(
                div
            );
        });

    } catch (error) {

        console.error(error);

        bookingsContainer.innerHTML =
            `
            <h2>
                Error loading bookings
            </h2>
            `;
    }
}


// ==========================================
// CANCEL BOOKING
// ==========================================

async function cancelBooking(
    seatNumber,
    movieName
) {

    try {

        const response =
            await fetch(
                `${API_URL}/api/bookings/cancel`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({

                        seatNumber,

                        movieName
                    })
                }
            );

        const data =
            await response.json();

        alert(data.message);

        fetchBookings();

    } catch (error) {

        console.error(error);

        alert(
            'Cancel failed'
        );
    }
}


// INITIAL LOAD

fetchBookings();