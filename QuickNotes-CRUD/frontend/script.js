const API_URL = 'http://localhost:5000/notes';

// 1. Backend se notes lekar screen par dikhana
async function fetchNotes() {
    const res = await fetch(API_URL);
    const notes = await res.json();
    const container = document.getElementById('notesContainer');
    container.innerHTML = notes.map(n => `<p>⭐ ${n.content}</p>`).join('');
}

// 2. Naya note backend ko bhejna
async function saveNote() {
    const input = document.getElementById('noteInput');
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input.value })
    });
    input.value = ''; // Input khali karo
    fetchNotes(); // List refresh karo
}

// Page load hote hi notes dikhao
fetchNotes();