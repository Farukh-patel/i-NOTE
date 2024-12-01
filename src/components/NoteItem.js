import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { mode, note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className={`card-body ${mode === "light" ? "card-body-light" : "card-body-dark"}`}>
          <div className="d-flex align-items-center">
            <h5 className={`card-title ${mode === "light" ? "light-mode" : "dark-mode"}`}>
              {note.title}
            </h5>

            <div className="ms-auto">
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => updateNote(note)}
              ></i>
              <i
                className="fa-regular fa-trash-can mx-2"
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Note deleted successfully", "success");
                }}
              ></i>
            </div>
          </div>
          <p style={{ color: mode === "light" ? "black" : "white" }} className="card-text">
            {note.description}
          </p>
          <span style={{ color: mode === "light" ? "black" : "white" }} className="card-tag">
            <strong>{note.tag}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
