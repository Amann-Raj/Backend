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
async function handleSearch() {
    const searchText = document.getElementById('searchInput').value;
    
    // Agar search bar khali hai, toh saare notes dikhao
    if (searchText === "") {
        fetchNotes();
        return;
    }

    // Backend ko search query bhejna
    const res = await fetch(`${API_URL}/search?text=${searchText}`);
    const filteredNotes = await res.json();
    
    // UI update karna (hum purana logic reuse kar rahe hain)
    displayNotes(filteredNotes); 
}

// Thoda sa cleanup: displayNotes ko alag function bana lete hain taaki reuse ho sake
function displayNotes(notes) {
    const container = document.getElementById('notesContainer');
    
    // Safety check: Agar notes array nahi hai toh handle karo
    if (!Array.isArray(notes)) {
        console.error("Expected array but got:", notes);
        container.innerHTML = "<p>Notes load nahi ho paye.</p>";
        return;
    }

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

// Purane fetchNotes ko update karein
async function fetchNotes() {
    const sortDropdown = document.getElementById('sortOrder');
    const order = sortDropdown ? sortDropdown.value : 'desc';

    try{
        const res = await fetch(`${API_URL}?order=${order}`);
        const notes = await res.json();
        displayNotes(notes);
    }catch(err){
        console.error("Notes fetch nahi ho paye:", err);
    }
}