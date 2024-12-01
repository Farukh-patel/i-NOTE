import React  from "react";
import { Link,  useNavigate } from "react-router-dom";

function Navbar(props) {
  let navigate=useNavigate()
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('token');
      navigate("/login");
    }
  };

  // this is just to make navbar heading light up
  // const Location = useLocation();
  // useEffect(() => {
  //   console.log(Location.pathname);
  // }, [Location]);

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
        <div className="container-fluid">
          {/* Replace image with video */}
          <Link className="navbar-brand d-flex align-items-center" to="/home">
            <video
              src="/logoVideo2.mp4" // Replace with the actual path to your video
              width="45"
              height="45"
              autoPlay
              // loop
              muted
              style={{ borderRadius: "50%", marginRight: "10px" }}
            />
            iNOTE..
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${Location.pathname === "/home" ? "active" : ""}`}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${Location.pathname === "/about" ? "active" : ""}`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${Location.pathname === "/addnote" ? "active" : ""}`}
                  to="/addnote"
                >
                  addnote
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${Location.pathname === "/profile" ? "active" : ""}`}
                  to="/profile"
                >
                  profile
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex">

              <Link className="btn btn-outline-success" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-outline-success mx-1" to="/signup" role="button">
                Signup
              </Link>
            </form> :
              <Link onClick={handleLogout} className="btn btn-outline-success" to="/login" role="button">
                Logout
              </Link>}
            <div className="form-check form-switch mx-2 my-2">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={props.toggleMode}
              />
              <label
                className="form-check-label"
                style={{ color: props.mode === "dark" ? "white" : "black" }}
                htmlFor="flexSwitchCheckDefault"
              >
                {props.mode === "dark" ? "Dark mode" : "Light mode"}
              </label>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;



