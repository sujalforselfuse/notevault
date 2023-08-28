import noteContext from './noteContext';
import { useState } from 'react';
/* const host=process.env.BASE_URL; */
const NoteState = (props) => {
  const host = "https://noteappbackend2.onrender.com"
  /* const host = "http://localhost:5000" */
  
  const notesInitial = []

  const [notes, Setnotes] = useState(notesInitial);

  //get all notes
  const getallNotes = async () => {
    //fetch api
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",


      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

     
    });
    const json=await response.json();
    Setnotes(json);
  }

  const addNote = async (title, description, tag) => {
    //fetch api
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",


      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    
    const note = await response.json();
    Setnotes(notes.concat(note));
    
  
  }




  const editNote = async (id, title, description, tag) => {

    //api call to backend

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",


      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const json = response.json();
    console.log(json);

    let newnotes=JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];

      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    Setnotes(newnotes);
  }

  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    });
    const json = response.json();
    console.log(json);

    const newNotes = notes.filter((note) => { return note._id !== id });
    Setnotes(newNotes);
  }


  return (
    <noteContext.Provider value={{ notes, editNote, addNote, deleteNote,getallNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;