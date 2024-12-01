import React, { useState } from "react";

import NoteContext from "./NoteContext"; // Importing the context to share state globally


const NoteState = (props) => {
  const host = "http://localhost:5000"; // Base URL for API calls
  const initialnotes = []; // Initial state for notes

  const [notes, setnotes] = useState(initialnotes); // State to hold the list of notes

  // Fetch all notes
  const getNotes = async () => {
    // API call to fetch all notes
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "aplication/json", // Content type header
          "auth-token": localStorage.getItem('token'), // Hardcoded auth-token
        },
      });
      const json = await response.json(); // Parsing response to JSON
      setnotes(json); // Updating the notes state with fetched data
      // console.log(json); // Logging the fetched notes
    } catch (error) {
      console.error("Failed to fetch all  notes:", error); // Error handling
    }
  };

  // Add a new note

  const addNote = async (title, description, tag,navigate) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "auth-token":localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });
  
      const note = await response.json(); // Parse the response
      // console.log("Response from backend:", note); // Debugging
  
      if (note) {
        setnotes(notes.concat(note)); // Update state
        // console.log("Updated notes:", notes.concat(note)); // Debugging
  
        // Redirect to the Home page
        navigate("/home");
      } else {
        console.error("Error: Note is undefined");
      }
    } catch (error) {
      console.error("Failed to add note:", error); // Error handling
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    // console.log("deleting note with id" + id); // Logging for debugging
    try {

      // API call to delete a note
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Content type header
          "auth-token":
           localStorage.getItem('token'), // Hardcoded auth-token
        },
      });
      const json = response.json(); // Parsing response (though not used here)
      console.log(json); // Logging the response
 
      // Filtering out the deleted note from the state
      const newNotes = notes.filter((note) => {
        return note._id !== id; // Keeping notes with IDs that don't match the deleted ID
      });
      setnotes(newNotes); // Updating the state
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  

  // Edit a note-=--2

  const fetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      headers: { "auth-token":localStorage.getItem('token') },
    });
    const data = await response.json();
    setnotes(data);
  };

  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'), // Use a dynamic token in production
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const updatedNote = await response.json(); // Get updated note
      console.log("Updated note from server:", updatedNote);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${updatedNote.error}`);
      }

      await fetchNotes(); // Re-fetch all notes
    } catch (error) {
      console.error("Failed to edit note:", error);
    }
  };



  return (
    // Providing the notes and functions to the rest of the app
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children} {/* Rendering children components */}
    </NoteContext.Provider>
  );
};

export default NoteState;
