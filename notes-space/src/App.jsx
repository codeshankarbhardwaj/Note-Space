import { useState } from "react";
import Section from "./components/section";
import Editor from "./components/editor";


function App() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Add Title - 1", content: "Write your content", parentId: null},
    { id: 2, title: "Add Title - 2", content: "Write your content", parentId: null },
  ]);

  const [selectedNoteId, setSelectedNoteId] = useState(1);

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      content: "",
      parentId: null
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  const updateNote = (id, updatedFields) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, ...updatedFields } : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (selectedNoteId === id && notes.length > 1) {
      setSelectedNoteId(notes[0].id);
    }
    0
  };

  return (
    <div className="app">
      <Section
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={setSelectedNoteId}
        onAddNote={addNote}
        onDeleteNote={deleteNote}
      />
      <Editor note={selectedNote} onUpdateNote={updateNote} />
    </div>
  );
}

export default App;