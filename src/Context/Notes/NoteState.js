import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    // const host = "http://localhost:5000";
    const host = "https://skynotes.herokuapp.com";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial); // This is state.

    // Add Note()
    const addNote = async (title, description, tag) => {
        // TODO: API Call
        // API Call:
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    // Delete Note()
    const deleteNote = async (id) => {
        // TODO: API Call
        // API Call:
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });
        const json = response.json();
        console.log("Delete Note: " + json);

        // console.log("Deleting the note with id: " + id); // This is for testing only.
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    // Edit Note()
    const editNote = async (id, title, description, tag) => {
        // API Call:
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json(); // This is for testing only.
        console.log("Edit Note: " + json);

        let newNotes = JSON.parse(JSON.stringify(notes));

        // Logic to edit in client.
        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    // Get All Notes
    const getNote = async () => {
        // API Call:
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const json = await response.json();
        console.log(json); // This is for testing only.
        
        setNotes(json);
    }

    return (
        // Note:-> Below line is another way of using context Api like above line.
        // <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNote }}>
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;