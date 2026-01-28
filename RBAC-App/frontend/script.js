const API_URL = "http://localhost:5000/api/auth";
let isLogin = false;

// 1. Toggle between Login and Register
function toggleAuth() {
    isLogin = !isLogin;
    document.getElementById('form-title').innerText = isLogin ? "Login" : "Register";
    document.getElementById('auth-btn').innerText = isLogin ? "Login Now" : "Create Account";
    document.getElementById('name-group').classList.toggle('hidden', isLogin);
    document.getElementById('role-group').classList.toggle('hidden', isLogin);
    document.querySelector('.toggle-text').innerHTML = isLogin ? 
        `Don't have an account? <span onclick="toggleAuth()">Register</span>` :
        `Already have an account? <span onclick="toggleAuth()">Login</span>`;
}

// 2. Submit Auth (Register or Login)
async function submitAuth() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const endpoint = isLogin ? 'login' : 'register';
    const payload = isLogin ? { email, password } : { name, email, password, role };

    try {
        const res = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userRole', data.role);
            showDashboard(data.name, data.role);
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Backend server is not running!");
    }
}

// 3. Access Admin Protected Route
async function fetchAdminData() {
    const token = localStorage.getItem('token');
    const responseBox = document.getElementById('api-response');

    try {
        const res = await fetch(`${API_URL}/admin-dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await res.json();
        
        if (res.status === 403) {
            responseBox.style.borderColor = "red";
            responseBox.innerText = "❌ Access Denied: You are not an Admin!";
        } else {
            responseBox.style.borderColor = "#10b981";
            responseBox.innerText = `✅ Success: ${data.message}`;
        }
    } catch (err) {
        responseBox.innerText = "Error fetching data.";
    }
}

// 4. Helper Functions
function showDashboard(name, role) {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('dashboard-section').classList.remove('hidden');
    document.getElementById('user-name').innerText = name;
    document.getElementById('user-role').innerText = role;
}

function logout() {
    localStorage.clear();
    location.reload();
}

// Check if user already logged in on refresh
window.onload = () => {
    const token = localStorage.getItem('token');
    if (token) {
        showDashboard(localStorage.getItem('userName'), localStorage.getItem('userRole'));
    }
};