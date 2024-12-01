import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext"; // Importing the context for accessing notes-related data and functions
import NoteItem from "./NoteItem"; // Component to render individual notes
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const {mode,showAlert}=props
  const context = useContext(noteContext); // Using context to access global state for notes
  const { notes, getNotes, editNote } = context; // Destructuring notes and getNotes function from context
  let navigate=useNavigate()
  // Fetching notes when the component is mounted
  useEffect(() => {
    if (localStorage.getItem('token')) {
      
      getNotes();
    } else {
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null); // Ref for triggering the hidden "Launch modal" button
  const refClose = useRef(null);
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  }); // State for the editable note data

  // Function to open the modal and populate it with the data of the note to be updated
  const updateNote = (currentNote) => {
    ref.current.click(); // Trigger the hidden button to open the modal
    setnote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    }); // Set the state with the current note's data
  };


  // Function to handle the "Update Note" button click
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("updated note successfully", "success")

  };

  // Function to handle changes in the modal's input fields
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value }); // Update the state with new values as the user types
  };

  return (
    <>
     

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch demo modal
      </button>

      {/* Modal for editing an existing note */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div  className={`modal-content ${mode === "light" ? "card-body-light" : "card-body-dark"}`}>
            <div className="modal-header">
              <h5 className={`modal-title  ${mode === "light" ? "light-mode" : "dark-mode"}`}  id="staticBackdropLabel">
                Edit Your Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Form for editing the note */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>
                    ENTER TITLE
                  </label>
                  <input
                    type="text"
                    className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `} 
                    id="etitletext"
                    aria-describedby="etitletext"
                    name="etitle"
                    onChange={onchange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>
                    ENTER DESCRIPTION
                  </label>
                  <input
                    type="text"
                    className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `} 
                    id="edescription"
                    name="edescription"
                    onChange={onchange}
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>
                    ENTER TAG
                  </label>
                  <input
                    type="text"
                    className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `} 
                    id="etag"
                    name="etag"
                    onChange={onchange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              {/* Close button */}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                CLOSE
              </button>
              {/* Button to save changes */}
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Displaying the list of notes */}
      <h4 style={ {color: mode==="light"?"black":"white"}}  className="my-5">{notes.length===0?"NO NOTES TO DISPLAY ":"YOUR NOTES"}</h4>
      <div className="row my-3">
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} mode={mode}  showAlert={showAlert}  updateNote={updateNote} />;
        })}
      </div>
    </>
  );
}

export default Notes;
