document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    const responseMessage = document.getElementById('response-message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Reset error messages
        usernameError.textContent = '';
        passwordError.textContent = '';
        responseMessage.textContent = '';
        
        // Validate inputs
        const username = usernameField.value.trim();
        const password = passwordField.value.trim();
        let hasErrors = false;

        if (!username) {
            usernameError.textContent = 'Username/Email is required';
            hasErrors = true;
        } else if (!/\S+@\S+\.\S+/.test(username)) {
            usernameError.textContent = 'Invalid email format';
            hasErrors = true;
        }

        if (!password) {
            passwordError.textContent = 'Password is required';
            hasErrors = true;
        } else if (password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long';
            hasErrors = true;
        }

        if (hasErrors) return;

        // Send POST request to API
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const result = await response.json();

            if (response.ok) {
                responseMessage.textContent = 'Login successful!';
                responseMessage.style.color = 'green';
            } else {
                responseMessage.textContent = 'Login failed. Please try again.';
                responseMessage.style.color = 'red';
            }
        } catch (error) {
            responseMessage.textContent = 'An error occurred. Please try again.';
            responseMessage.style.color = 'red';
        }
    });
});
