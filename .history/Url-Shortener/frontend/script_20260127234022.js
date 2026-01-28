const shortenBtn = document.getElementById('shortenBtn');
const resultSection = document.getElementById('resultSection');
const displayShortLink = document.getElementById('displayShortLink');
const clickCount = document.getElementById('clickCount');

shortenBtn.addEventListener('click', async () => {
    const fullUrl = document.getElementById('longUrl').value;

    if (!fullUrl) {
        alert("Please enter a URL first!");
        return;
    }

    try {
        // 1. Backend API Call (POST request)
        const response = await fetch('http://localhost:5000/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullUrl: fullUrl }) // Backend req.body.fullUrl expect kar raha hai
        });

        const data = await response.json();

        if (response.ok) {
            // 2. URL Construct karna
            // Aapka backend localhost:5000 par chal raha hai aur shortId data.shortId mein hai
            const finalShortUrl = `http://localhost:5000/${data.shortId}`;

            // 3. UI par dikhana
            resultSection.style.display = 'block';
            displayShortLink.innerHTML = `<a href="${finalShortUrl}" target="_blank">${finalShortUrl}</a>`;
            clickCount.innerText = data.clicks || 0;
            
            console.log("Success! Backend se data mila:", data);
        } else {
            alert("Error: " + data.error);
        }

    } catch (error) {
        console.error("Backend connect nahi ho pa raha:", error);
        alert("Backend server check karein (Check if it's running on port 5000)");
    }
});