const shortenBtn = document.getElementById('shortenBtn');
const resultSection = document.getElementById('resultSection');
const displayShortLink = document.getElementById('displayShortLink');
const clickCount = document.getElementById('clickCount');

let currentShortId = ""; // Global variable to track current active link
let pollingInterval = null; // Interval to stop/start polling

// Function to fetch latest clicks from backend
const fetchLatestStats = async (shortId) => {
    try {
        // Backend mein humne /stats/:shortId endpoint banaya hai
        const response = await fetch(`http://localhost:5000/stats/${shortId}`);
        const data = await response.json();
        
        if (response.ok) {
            clickCount.innerText = data.clicks;
            console.log("Stats Updated from Backend:", data.clicks);
        }
    } catch (error) {
        console.error("Polling error:", error);
    }
};

shortenBtn.addEventListener('click', async () => {
    const fullUrl = document.getElementById('longUrl').value;

    if (!fullUrl) {
        alert("Please enter a URL first!");
        return;
    }

    // Pehle se chal rahe polling ko saaf karein
    if (pollingInterval) clearInterval(pollingInterval);

    try {
        const response = await fetch('http://localhost:5000/shorten', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullUrl: fullUrl })
        });

        const data = await response.json();

        if (response.ok) {
            currentShortId = data.shortId; 
            const finalShortUrl = `http://localhost:5000/${data.shortId}`;

            // UI Update
            resultSection.style.display = 'block';
            displayShortLink.innerHTML = `<a href="${finalShortUrl}" target="_blank">${finalShortUrl}</a>`;
            clickCount.innerText = data.clicks || 0;

            // --- Backend Heavy Concept: Polling ---
            // Har 3 second mein backend se "taaza" data mangwayein
            pollingInterval = setInterval(() => {
                fetchLatestStats(currentShortId);
            }, 3000);

        } else {
            alert("Error: " + data.error);
        }
    } catch (error) {
        console.error("Connection Error:", error);
        alert("Backend server check karein!");
    }
});