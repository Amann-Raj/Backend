const shortenIt = async () => {
    const longUrl = document.getElementById('longUrl').value;
    
    // Backend API ko call karna
    const response = await fetch('http://localhost:5000/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullUrl: longUrl })
    });

    const data = await response.json();
    if(data.shortId) {
        const shortLink = `http://localhost:5000/${data.shortId}`;
        document.getElementById('result').innerHTML = `Shortened: <a href="${shortLink}">${shortLink}</a>`;
    }
}