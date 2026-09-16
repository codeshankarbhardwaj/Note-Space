import { useState } from "react";
import Section from "./components/section";
import Editor from "./components/editor";


function App() {
  const [notes, setNotes] = useState([
    { id: 1, title: "My trip experience", content: "" },
    { id: 2, title: "Day and night plan", content: "" },
  ]);

  const [selectedNoteId, setSelectedNoteId] = useState(1);

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      content: "",
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