const noteForm = document.getElementById('noteForm');
const notesContainer = document.getElementById('notesContainer');
const searchInput = document.getElementById('search');

document.getElementById('filterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    fetchNotes();
  });
  
  async function fetchNotes() {
    const search = document.getElementById('searchInput').value;
    const tag = document.getElementById('tagFilterInput').value;
  
    let url = '/api/notes';
    const params = [];
  
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    if (tag) params.push(`tag=${encodeURIComponent(tag)}`);
    if (params.length) url += `?${params.join('&')}`;
  
    const response = await fetch(url);
    const notes = await response.json();
  
    notesContainer.innerHTML = '';
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <p><strong>Теги:</strong> ${note.tags.join(', ')}</p>
        <button onclick="editNote('${note._id}')">✏️ Изменить</button>
        <button onclick="deleteNote('${note._id}')">🗑️ Удалить</button>
      `;
      notesContainer.appendChild(noteElement);
    });
  }
  
async function loadNotes() {
  const res = await fetch('/api/notes');
  const notes = await res.json();
  displayNotes(notes);
}

function displayNotes(notes) {
  notesContainer.innerHTML = '';
  notes.forEach(note => {
    const noteEl = document.createElement('div');
    noteEl.className = 'note';
    noteEl.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <small>Теги: ${note.tags.join(', ')}</small>
    `;
    notesContainer.appendChild(noteEl);
  });
}

noteForm.addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const tags = document.getElementById('tags').value.split(',').map(t => t.trim());

  await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, tags })
  });

  noteForm.reset();
  loadNotes();
});

searchInput.addEventListener('input', async () => {
  const query = searchInput.value;
  const res = await fetch(`/api/notes/search?tag=${query}`);
  const notes = await res.json();
  displayNotes(notes);
});

loadNotes();
