import React, { useContext } from 'react'
import NoteContext from '../Context/Notes/NoteContext';

const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <>
            <div className="col-md-3 my-2">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{note.title}</h5>
                            <i className="fa-solid fa-pen-to-square mx-3" title='Update Note' onClick={() => { updateNote(note) }}></i>
                            <i className="fa-solid fa-trash mx-2" title='Delete Note' onClick={() => { deleteNote(note._id); props.showAlert("Note deleted successfully", "success"); }}  ></i>
                        </div>
                        <p className="card-text"> {note.description} </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem;