import React, { useContext, useEffect, useRef, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
export default function Notes(props) {
    let history = useNavigate();
    const context = useContext(noteContext);
    const { notes, getallNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {

            getallNotes();
        }
        else {
            history('/login');
        }
    }, [])
    const ref = useRef(null);
    const ref2 = useRef(null);
    
    const updateNote = (currentnote,color) => {
        ref.current.click();
        
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag ,modalcolor:color});

    }
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" ,modalcolor:0});
    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        ref2.current.click();
        props.showAlert("Note updated successfully", "success");
    }

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    
    const colors = ["rgb(218, 185, 224)", "rgb(255, 102, 102)", "rgb(255, 255, 204)", "rgb(204, 255, 204)", "rgb(255, 153, 204)", "cyan"];

    


    return (
        <>
            <Addnote showAlert={props.showAlert}></Addnote>


            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" >
                    <div className="modal-content" style={{backgroundColor:'rgb(45, 5, 74)'}}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit a Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                        <div className="modal-body" style={{backgroundColor:colors[note.modalcolor%6] }}>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label" style={{color:'rgb(45, 5, 74)'}}>Title</label>
                                    <input type="text" className="form-control" minLength={5} required id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={handleChange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label" style={{color:'rgb(45, 5, 74)'}}>Description</label>
                                    <input type="text" className="form-control" minLength={5} required id="edescription" name='edescription' value={note.edescription} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label" style={{color:'rgb(45, 5, 74)'}}>Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={handleChange} />
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={ref2} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1 style={{fontSize:'2rem',fontFamily:'poppins',fontWeight:'bolder'}}>My Notes</h1>
                <div className="container mx-2">
                    {notes.length === 0 && 'no notes to diaplsy'}
                </div>
                {
                    notes.map((note, index) => {


                        return <Noteitem key={note._id} updateNote={updateNote} note={note} colorIndex={index} showAlert={props.showAlert} color={colors[index % 6]}></Noteitem>
                    })
                }
            </div>
        </>
    )
}


