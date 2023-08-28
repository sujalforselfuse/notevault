import React,{useContext} from 'react';
import noteContext from '../context/notes/noteContext';
import './noteitem.css';
export default function Noteitem(props) {
    const { note ,updateNote} = props;
    const context=useContext(noteContext);
    const {deleteNote}=context;
    return (
        <div className='col-md-3' >
            <div className="card my-3 h-30 ">

                <div className="card-body rounded overflow-auto " style={{backgroundColor:`${props.color}`,height:'7rem'}}>
                    <div className="d-flex align-items-center">
                        <h5 className="card-title" style={{fontWeight:"bolder"}}>{note.title.toUpperCase()}</h5>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note,props.colorIndex)}}></i>
                        <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Noted deleted successfully","success");}}></i>
                    </div>

                    <p className="card-text" style={{fontFamily:'auto'}}>{note.description}</p>
                </div>
            </div>
        </div>
    )
}
