const API_URL =
    'https://movie-booking-backend-knx1.onrender.com';


const loginForm =
    document.getElementById(
        'loginForm'
    );


loginForm.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        const username =
            document.getElementById(
                'username'
            ).value;

        const password =
            document.getElementById(
                'password'
            ).value;

        try {

            const response =
                await fetch(
                    `${API_URL}/api/auth/login`,
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({
                            username,
                            password
                        })
                    }
                );

            const data =
                await response.json();

            alert(data.message);

            if (response.ok) {

                localStorage.setItem(
                    'username',
                    data.user.username
                );

                window.location.href =
                    'index.html';
            }

        } catch (error) {

            console.log(error);

            alert('Login failed');
        }
    }
);