import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const noteInitial = []
  const [notes, setNotes] = useState(noteInitial)

   //Get all notes
   const getNotes = async () => {
    //Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmMmRkYzMyNTIxODMyYTY5NTNiZWJhIn0sImlhdCI6MTY5MzYzODEzNX0.68MYbn_DMA11USjvu2zd42lSUBDxzaI70HJ8XaHuWls"
      },
    });
    const json = await response.json();
    setNotes(json)
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    try {
      
    } catch (error) {
      
    }
    //Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmMmRkYzMyNTIxODMyYTY5NTNiZWJhIn0sImlhdCI6MTY5MzYzODEzNX0.68MYbn_DMA11USjvu2zd42lSUBDxzaI70HJ8XaHuWls"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json()
    console.log(json);
    const note = {
      "_id": "64f7495f146160a433500883a",
      "user": "64f2ddc32521832a6953beba",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-09-05T15:29:35.404Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }


  //Delete a note
  const deleteNote = async(id) => {
      //Api call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmMmRkYzMyNTIxODMyYTY5NTNiZWJhIn0sImlhdCI6MTY5MzYzODEzNX0.68MYbn_DMA11USjvu2zd42lSUBDxzaI70HJ8XaHuWls"
        },
      });
      const json = response.json(); 
      console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes)
  }


  //Edit note
  const editNote = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRmMmRkYzMyNTIxODMyYTY5NTNiZWJhIn0sImlhdCI6MTY5MzYzODEzNX0.68MYbn_DMA11USjvu2zd42lSUBDxzaI70HJ8XaHuWls"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json()
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;