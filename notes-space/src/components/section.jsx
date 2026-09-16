function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function Section({ notes, selectedNoteId, onSelectNote, onAddNote, onDeleteNote, onAddSubNote }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="logo">Notes <span>Space</span></h2>
      </div>

      <button className="new-note-btn" onClick={onAddNote}>
        Take a new note <span className="plus-icon">+</span>
      </button>

      <div className="notes-header">
        <h3>Your Notes</h3>
      </div>

      <div className="notes-list">
        {notes.filter((note) => (note.parentId === null)).map((note) => (
          <div
            key={note.id}
            className={`note-item ${note.id === selectedNoteId ? "active" : ""}`}
            onClick={() => onSelectNote(note.id)}
          >
            <div className="note-info">
              <h4>{note.title || "Untitled"}</h4>
              <p>{stripHtml(note.content).slice(0, 40) || "No content yet..."}</p>
            </div>
            <button className="add-sub-note-btn" onClick={(e) => { e.stopPropagation;
            onAddSubNote(note);}}>
              <span className="plus-icon2">+</span>Sub-note
            </button>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNote(note.id);
              }}
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section;