import React, { useState, useContext } from 'react'
import NoteContext from '../Context/Notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "" })

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        if (note.title.length < 1 || note.description.length < 1) {
            props.showAlert("Title and Description can't be empty !!", "warning");
        } else {
            e.preventDefault();
            addNote(note.title, note.description);
            setNote({ title: "", description: "" })
            props.showAlert("Note created successfully.", "success");
        }
    }

    return (
        <>
            <div>
                <h2>Create New Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} required />
                    </div>
                    {/* <button disabled={note.title.length < 3 || note.description.length < 3} type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button> */}
                    <button type="submit" className="btn btn-info" onClick={handleClick} >Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote;