import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Aboute from './components/Aboute';
import NoteState from './context/notes/Notestate';
import Login from './components/Login';
import Signup from './components/Signup'
import AddNote from './components/AddNote';
import Alert from './components/Alert';
import { useState } from 'react';
import Profile from './components/Profile';
import Updateprofile from './components/Updateprofile';
function App() {
 const [mode, setmode] = useState("light")
 const [alert, setalert] = useState(null)
 const showAlert=(message,type)=>{
  setalert({
    msg:message,
    type:type
  });
  setTimeout(() => {
    setalert(null)
  }, 1500);
 }

 const toggleMode = () => {

  if (mode === "light") {
    document.body.style.backgroundColor = "#212f3c ";
    setmode("dark");
  } else {
    document.body.style.backgroundColor = "#f5f5f5";
    setmode("light");
  }
};

  return (
    <>
      <NoteState>
        <Router>
          <Navbar toggleMode={toggleMode}  mode={mode}/>
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              {/* Route for Home */}
              <Route exact path="/home" element={<Home mode={mode}  showAlert={showAlert}/> } key="home" />

              {/* Route for About */}
              <Route exact path="/about" element={<Aboute mode={mode}  showAlert={showAlert} />} key="about" />

              {/* Route for Login */}
              <Route exact path="/login" element={<Login mode={mode}  showAlert={showAlert} />}/>

              {/* Route for Signup */}
              <Route exact path="/signup" element={<Signup mode={mode}  showAlert={showAlert} />} />

              {/* Route for add note */}
              <Route exact path="/addNote" element={<AddNote mode={mode}  showAlert={showAlert} />} />

              {/* Route for profile */}
              <Route exact path="/profile" element={<Profile mode={mode}  showAlert={showAlert} />} />

              {/* Route for Updateprofile */}
              <Route exact path="/updateprofile" element={<Updateprofile mode={mode}  showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
