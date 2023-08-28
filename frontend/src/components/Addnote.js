import React,{useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';
import './addnote.css';
export default function Addnote(props) {
    const context=useContext(noteContext);
    const {addNote}=context;

    const [note,setNote]=useState({title:"",description:"",tag:""});
    const handleClick=(e)=>{
        e.preventDefault();
        
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("Note added successfully","success");
        
    }

    const handleChange=(e)=>{
        

        setNote({...note,[e.target.name]:e.target.value})

       
    }
    return (
        <div className="container addnotecss my-3 rounded" style={{backgroundColor:'rgb(195, 165, 223)',color:'black'}}>
            <h1 style={{fontSize:'2rem'}}>Add a note</h1>
            
            
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" placeholder='Enter Note title' minLength={5} required  id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={handleChange}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" placeholder='Enter Note description' minLength={5} required  id="description" name='description'value={note.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" placeholder='Enter title tag' id="tag" name='tag' value={note.tag} onChange={handleChange} />
                </div>
                
                <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn  mb-2" style={{backgroundColor:"indigo",color:"white"}} onClick={handleClick}>Add a Note</button>
            </form>
        </div>
    )
}
