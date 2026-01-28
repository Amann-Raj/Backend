const handleAuth = async (type) => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const status = document.getElementById('status');

    try {
        const res = await fetch(`http://localhost:5000/api/auth/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token); // Browser storage mein token save
            status.style.color = 'green';
            status.innerText = `${type.toUpperCase()} Success! Token Saved.`;
        } else {
            status.style.color = 'red';
            status.innerText = data.message;
        }
    } catch (err) {
        status.innerText = "Error connecting to server";
    }
};