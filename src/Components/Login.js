import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom' // It's not working. It is replaced with useNavigate() of react-router-dom.

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    // let history = useHistory();
    let navigate = useNavigate(); // We use this because useHistory has been replaced with useNavigate of react-router-dom.

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch("http://localhost:5000/api/auth/login", {
        const response = await fetch("https://skynotes.herokuapp.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect.
            localStorage.setItem('token', json.authtoken);
            // history.push("/"); // Since, useHistory() is replaced with useNavigate so we have to use navigate() instead of push().
            props.showAlert("Logged in Successfully.", "success");
            navigate("/");
        }
        else {
            props.showAlert("Invalid email or password !!", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="modal('show')">
                <div className="modal-dialog modal-dialog-centered" >
                    <div style={{ backgroundColor: "aqua" }} className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Login to your account</b></h5>
                        </div>
                        <div className="modal-body">
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label"><b> Email Id </b></label>
                                        <input type="email" required className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label"> <b> Password </b></label>
                                        <input type="password" required className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                                    </div>

                                    <button style={{ width: "100%", backgroundColor: "blue" }} type="submit" className="btn btn-primary"><b>Login</b></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
// Below is auth-token of fetchallnotes of thunderclient.
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiNzRhYTkwMzExMWM2NmZmNTNlOTk5In0sImlhdCI6MTY1NjIyOTI4OH0.gInjCCwzjjvIJZTpybfc7kxulnd0uCH86JYkw1lvGD0