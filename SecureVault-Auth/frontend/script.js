let isLogin = true;
const API_URL = "http://localhost:5000/api";

// YAHI WO FUNCTION HAI JO MISSING BATA RAHA HAI
function toggleMode() {
    isLogin = !isLogin;
    const usernameInput = document.getElementById('username');
    const title = document.getElementById('title');
    const btn = document.getElementById('btn');
    const toggleText = document.getElementById('toggleText');

    if (isLogin) {
        usernameInput.classList.add('hidden');
        title.innerText = "Login";
        btn.innerText = "Login";
        toggleText.innerText = "Naya account? Signup karein";
    } else {
        usernameInput.classList.remove('hidden');
        title.innerText = "Signup";
        btn.innerText = "Signup";
        toggleText.innerText = "Pehle se account hai? Login karein";
    }
}

async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    const endpoint = isLogin ? '/login' : '/signup';
    const bodyData = isLogin ? { email, password } : { username, email, password };

    const res = await fetch(API_URL + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
    });

    const data = await res.json();

    if (res.ok) {
        if (isLogin) {
            // Token ko browser ki memory mein save karein
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', data.username);
            showDashboard();
        } else {
            alert("Signup successful! Ab login karein.");
            toggleMode();
        }
    } else {
        alert(data.error || "Kuch ghalat hua!");
    }
}

function showDashboard() {
    document.getElementById('authBox').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('userDisp').innerText = localStorage.getItem('user');
    document.getElementById('tokenDisp').innerText = localStorage.getItem('token').substring(0, 20) + "...";
}

function logout() {
    localStorage.clear();
    location.reload();
}

// Page load par check karein agar user pehle se logged in hai
if (localStorage.getItem('token')) showDashboard();