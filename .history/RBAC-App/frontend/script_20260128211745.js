async function auth(type) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const endpoint = type === 'login' ? 'login' : 'register';
    
    const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token); // Token save karna zaroori hai!
        document.getElementById('msg').innerText = "Success! Token saved.";
    } else {
        document.getElementById('msg').innerText = data.message;
    }
}