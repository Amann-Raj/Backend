let isLogin = true;
const API_URL = "http://localhost:5000/api";

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
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const username = document.getElementById('username').value.trim();

    // Safety: Khali fields check karein
    if (!email || !password || (!isLogin && !username)) {
        alert("Please saari fields bhariye!");
        return;
    }

    const endpoint = isLogin ? '/login' : '/signup';
    const bodyData = isLogin ? { email, password } : { username, email, password };

    try {
        console.log(`Bhej rahe hain ${isLogin ? 'Login' : 'Signup'} request...`, bodyData);

        const res = await fetch(API_URL + endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        });

        const data = await res.json();

        if (res.ok) {
            if (isLogin) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.username);
                showDashboard();
            } else {
                alert("Signup successful! Ab login karke dekhiye.");
                toggleMode(); // Login mode par switch karo
            }
        } else {
            // Backend se aane wala asli error message alert mein dikhao
            alert(data.error || data.message || "Kuch ghalat hua!");
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        alert("Server se connection nahi ho paya! Check karein backend running hai ya nahi.");
    }
}

function showDashboard() {
    document.getElementById('authBox').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('userDisp').innerText = localStorage.getItem('user');
    
    const token = localStorage.getItem('token');
    document.getElementById('tokenDisp').innerText = token ? token.substring(0, 20) + "..." : "";
}

function logout() {
    localStorage.clear();
    location.reload();
}

if (localStorage.getItem('token')) showDashboard();