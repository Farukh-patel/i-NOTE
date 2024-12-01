import React from "react";
import Notes from "../components/Notes";
import { Link } from "react-router-dom";

function Home(props) {
  const { mode ,showAlert} = props
  return (

    <>
      <div>
        <div className={`container d-flex ${mode === "light" ? "light-mode" : "dark-mode"}`}>
        <Link  to="/addnote" role="button" style={{color: mode === "light" ? "black" : "white"}} className="btn btn-outline-success ">Add Note <i className="fa-regular fa-pen-to-square my-2"></i></Link>
    
        </div>
        <Notes mode={mode} showAlert={showAlert}/>
      </div>
    </>
  );
}

export default Home;
