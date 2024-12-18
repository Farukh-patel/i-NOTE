import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Signup = (props) => {

  const { mode } = props;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to include text fields and file
    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    formData.append("profileImage", document.getElementById("profileImage").files[0]); // Get the file

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        // 'Content-Type': 'application/json',  // Don't set this; FormData sets its own headers
      },
      body: formData,
    });

    const json = await response.json();
    // console.log(json);

    if (json.success) {
      props.showAlert("User added successfully", "success");
      localStorage.setItem("token", json.authToken);
      navigate("/home");
    } else {
      props.showAlert("Error during signup", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className={`container my-3 ${mode === "light" ? "card-body-light" : "card-body-dark"}`}>
      <form onSubmit={handleSubmit}>
        <div className={`mb-3 ${mode === "light" ? "light-mode" : "dark-mode"}`}>
          <label htmlFor="name" className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>
            NAME
          </label>
          <input
            type="text"
            className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `}
            value={credentials.name}
            onChange={onChange}
            id="name"
            name="name"
            aria-describedby="emailHelp"
          />

        </div>
        <div className="mb-3">
          <label htmlFor="email" className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>
            EMAIL ADDRESS
          </label>
          <input
            type="email"
            className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `}
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="email" className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>
            We'll never share your email with anyone else.
          </div>
          <div className="mb-3">
            <label for="formFile" className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>Default file input example</label>
            <input className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `} name="profileImage" type="file" id="profileImage" />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>
            PASSWORD
          </label>
          <input
            type="password"
            className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `}
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>
            PASSWORD
          </label>
          <input
            type="cpassword"
            className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `}
            value={credentials.cpassword}
            onChange={onChange}
            name="cpassword"
            id="cpassword"
            required
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
