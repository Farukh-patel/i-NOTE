import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const { mode } = props;
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        // console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/home");
            props.showAlert("loged in successfully", "success");
            // console.log("authToken received is ", json.authToken);

        }
        else {
            props.showAlert("invalid credentials", "danger");

        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className={`ccontainer my-3 ${mode === "light" ? "card-body-light" : "card-body-dark"}`}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>EMAIL ADDRESS</label>
                    <input type="email" className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `} value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">PASSWORD</label>
                    <input type="password" className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `} value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login