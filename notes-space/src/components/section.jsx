function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}



function NoteItem({ note, level, notes, selectedNoteId, onSelectNote, onDeleteNote, onAddSubNote }) {
const children = notes.filter((n) => n.parentId === note.id);

return (
  <div>

  <div
  className={`note-item ${note.id === selectedNoteId ? "active" : ""}`}
  style={{ marginLeft: level * 20 }}
  onClick={() => onSelectNote(note.id)}
>
  <div className="note-info">
    <h4>{note.title || "Untitled"}</h4>
    <p>{stripHtml(note.content).slice(0, 40) || "No content yet..."}</p>
  </div>
  <button
    className="add-sub-note-btn"
    onClick={(e) => {
      e.stopPropagation();
      onAddSubNote(note);
    }}
    >
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

{children.map((child) => (
  <NoteItem
  key={child.id}
  note={child}
  level={level + 1}
  notes={notes}
  selectedNoteId={selectedNoteId}
  onSelectNote={onSelectNote}
  onDeleteNote={onDeleteNote}
  onAddSubNote={onAddSubNote}
  />
))}
</div>
)
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
        {notes.filter((note) => (note.parentId === null))
       .map((note) => (
    <NoteItem
      key={note.id}
      note={note}
      level={0}
      notes={notes}
      selectedNoteId={selectedNoteId}
      onSelectNote={onSelectNote}
      onDeleteNote={onDeleteNote}
      onAddSubNote={onAddSubNote}
    />
  ))}
    </div>
    </div>
  );
}

export default Section;