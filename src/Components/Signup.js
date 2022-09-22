import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", conpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, conpassword } = credentials;
        if (password !== conpassword) {
            props.showAlert("Passwords are not equal ⚠", "danger");
        }
        else {
            // const response = await fetch("http://localhost:5000/api/auth/createuser", {
            const response = await fetch("https://skynotes.herokuapp.com/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json()
            // console.log(json); // This is for testing only.
            if (json.success) {
                // Save the auth token and redirect.
                sessionStorage.setItem('token', json.authtoken); // We use sessionStorage because it destroys data after ending session.
                props.showAlert("Account Created Successfully.", "success");
                // navigate("/");
                // const response2 = await fetch("http://localhost:5000/api/auth/login", {
                const response2 = await fetch("https://skynotes.herokuapp.com/api/auth/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                // Here, after Succesfully creating the user we logged in the user using signup credentials.
                const json2 = await response2.json()
                // console.log(json2); // This is for testing only.
                if (json2.success) {
                    // Save the auth token and redirect.
                    sessionStorage.setItem('token', json2.authtoken);
                    // history.push("/"); // Since, useHistory() is replaced with useNavigate so we have to use navigate() instead of push().
                    props.showAlert("Logged in Successfully.", "success");
                    navigate("/");
                }
            }
            else {
                props.showAlert("Sorry, user is already exists with this email !!", "danger");
            }
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="modal('show')">
                <div className="modal-dialog modal-dialog-centered" >
                    {/* <div style={{ backgroundColor: "aqua" }} className="modal-content"> */}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Create new account</b></h5>
                        </div>
                        <div className="modal-body">
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label"> <b> Name</b> </label>
                                        <input type="text" className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp" minLength={3} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label"> <b> Email Address</b></label>
                                        <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label"><b> Password</b></label>
                                        <input type="password" className="form-control" onChange={onChange} name="password" id="password" minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="conpassword" className="form-label"> <b> Confirm Password</b></label>
                                        <input type="password" className="form-control" onChange={onChange} name="conpassword" id="conpassword" minLength={5} required />
                                    </div>

                                    <button style={{ width: "100%", backgroundColor: "blue" }} type="submit" className="btn btn-primary"><b>Sign in</b></button>

                                    <h6 id="sepline">OR</h6>

                                    <div align="center">
                                        <div>
                                            Already have an account? <Link style={{ color: "#2baffa", textDecoration: "none", fontWeight: "bold" }} id="newaccount" to='/login'>Login</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;