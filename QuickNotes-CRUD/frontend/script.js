const API_URL = 'http://localhost:5000/notes';

// 1. READ: Notes dikhana aur buttons jorna
async function fetchNotes() {
    const res = await fetch(API_URL);
    const notes = await res.json();
    const container = document.getElementById('notesContainer');
    
    container.innerHTML = notes.map(n => `
        <div class="note-card">
            <span>${n.content}</span>
            <div class="actions">
                <button onclick="editNote('${n._id}', '${n.content}')">✏️</button>
                <button onclick="deleteNote('${n._id}')">🗑️</button>
            </div>
        </div>
    `).join('');
}

// 2. CREATE: Naya note (Wahi purana logic)
async function saveNote() {
    const input = document.getElementById('noteInput');
    if(!input.value) return alert("Kuch likho bhai!");

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input.value })
    });
    input.value = '';
    fetchNotes();
}

// 3. DELETE: Note hatana
async function deleteNote(id) {
    if(confirm("Kya aap ise delete karna chahte hain?")) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchNotes();
    }
}

// 4. UPDATE: Note edit karna
async function editNote(id, oldContent) {
    const newContent = prompt("Apna note edit karein:", oldContent);
    if (newContent && newContent !== oldContent) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: newContent })
        });
        fetchNotes();
    }
}

fetchNotes();