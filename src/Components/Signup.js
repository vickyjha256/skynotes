import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
            console.log(json);
            if (json.success) {
                // Save the auth token and redirect.
                localStorage.setItem('token', json.authtoken);
                navigate("/");
                props.showAlert("Account Created Successfully.", "success");
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
            {/* <div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp" minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={onChange} name="password" id="password" minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="conpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" onChange={onChange} name="conpassword" id="conpassword" minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
            </div> */}

            <div className="modal('show')">
                <div className="modal-dialog modal-dialog-centered" >
                    <div style={{ backgroundColor: "aqua" }} className="modal-content">
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