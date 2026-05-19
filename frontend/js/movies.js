const movies = [

    {
        name: 'Avengers',
        rating: '8.5',
        image: './assets/movies/avengers.jpg'
    },

    {
        name: 'Batman',
        rating: '8.3',
        image: './assets/movies/batman.jpg'
    },

    {
        name: 'Interstellar',
        rating: '9.1',
        image: './assets/movies/interstellar.jpg'
    },

    {
        name: 'Joker',
        rating: '8.4',
        image: './assets/movies/joker.jpg'
    },

    {
        name: 'Avatar',
        rating: '7.9',
        image: './assets/movies/avatar.jpg'
    },

    {
        name: 'Oppenheimer',
        rating: '8.9',
        image: './assets/movies/oppenheimer.jpg'
    },

    {
        name: 'Dune',
        rating: '8.2',
        image: './assets/movies/dune.jpg'
    },

    {
        name: 'Inception',
        rating: '9.0',
        image: './assets/movies/inception.jpg'
    },

    {
        name: 'John Wick',
        rating: '7.8',
        image: './assets/movies/johnwick.jpg'
    },

    {
        name: 'Spider-Man',
        rating: '8.1',
        image: './assets/movies/spiderman.jpg'
    }
];


// =====================================
// MOVIES CONTAINER
// =====================================

const moviesContainer =
    document.getElementById(
        'moviesContainer'
    );


// =====================================
// RENDER MOVIES
// =====================================

movies.forEach((movie) => {

    const card =
        document.createElement(
            'div'
        );

    card.classList.add(
        'movie-card'
    );

    card.innerHTML = `

        <img
            src="${movie.image}"
            alt="${movie.name}"
            class="movie-image"
        >

        <h2>
            ${movie.name}
        </h2>

        <p>
            ⭐ Rating:
            ${movie.rating}
        </p>

        <button
            onclick="selectMovie('${movie.name}')"
        >
            Book Now
        </button>
    `;

    moviesContainer.appendChild(
        card
    );
});


// =====================================
// SELECT MOVIE
// =====================================

function selectMovie(movieName) {

    localStorage.setItem(
        'selectedMovie',
        movieName
    );

    window.location.href =
        'seats.html';
}


// =====================================
// LOGOUT
// =====================================

const logoutBtn =
    document.getElementById(
        'logoutBtn'
    );

if (logoutBtn) {

    logoutBtn.addEventListener(
        'click',
        () => {

            localStorage.removeItem(
                'username'
            );

            localStorage.removeItem(
                'selectedMovie'
            );

            window.location.href =
                'login.html';
        }
    );
}