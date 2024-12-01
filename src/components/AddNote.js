import React, { useState } from "react";
import { useContext } from "react"; // Importing useContext to access the global state
import noteContext from "../context/notes/NoteContext"; // Importing the context for notes
import { useNavigate } from 'react-router-dom'
function AddNote(props) {
  let navigate = useNavigate();
  const {mode}=props;
  const context = useContext(noteContext); // Accessing the note context
  const { addNote } = context; // Extracting the addNote function from the context

  // State to hold the new note's data
  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      console.log("Note being added:", note); // Debugging
      await addNote(note.title, note.description, note.tag); // Add the note using the context function
      setnote({ title: "", description: "", tag: "" }); // Reset the form fields
      props.showAlert("note added successfully", "success");
      navigate("/home")
    } catch (error) {
      console.error("Failed to add note:", error); // Handle errors
    }
  };

  // Function to handle changes in the input fields
  const onchange = (e) => {
    console.log(`${e.target.name}: ${e.target.value}`); // Debugging
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className={`container my-3 ${mode === "light" ? "card-body-light" : "card-body-dark"}`}>
      <div  className={`container my-5 ${mode === "light" ? "light-mode" : "dark-mode"}`}>
        <h3>CREATE A NOTE</h3>

        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="titletext"  className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>
              ENTER TITLE
            </label>
            <input
              type="text"
              className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `} 
              id="titletext"
              aria-describedby="titletext"
              name="title"
              value={note.title}
              onChange={onchange} // Update state when the title input changes
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description"  className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>
              ENTER DESCRIPTION
            </label>
            <input
              type="text"
              className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `} 
              id="description"
              name="description"
              value={note.description}
              onChange={onchange} // Update state when the description input changes
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag"  className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>
              ENTER TAG
            </label>
            <input
              type="text"
              className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `} 
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onchange} // Update state when the tag input changes
            />
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
          >
            ADD NOTE
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
