import ReactQuill from "react-quill-new";


function Editor({ note, onUpdateNote }) {
  if (!note) {
    return <div className="editor empty">Select a note to start editing</div>;
  }

  return (
    <div className="editor">
      <input
        className="note-title-input"
        value={note.title}
        onChange={(e) => onUpdateNote(note.id, { title: e.target.value })}
        placeholder="Note title"
      />

      <ReactQuill
        theme="snow"
        value={note.content}
        onChange={(content) => onUpdateNote(note.id, { content })}
      />
    </div>
  );
}

export default Editor;