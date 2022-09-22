import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Forgotpassword = (props) => {
    const [credentials, setCredentials] = useState({ email: "" });

    let navigate = useNavigate(); // We use this because useHistory has been replaced with useNavigate of react-router-dom.

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch("http://localhost:5000/api/auth/forgotpassword", {
        const response = await fetch("https://skynotes.herokuapp.com/api/auth/forgotpassword", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email })
        });
        const json = await response.json()
        // console.log(json); // This is for testing only.
        if (json.success) {
            // Save the auth token and redirect.
            // sessionStorage.setItem('token', json.authtoken); // We use sessionStorage because it destroys data after ending session.
            // history.push("/"); // Since, useHistory() is replaced with useNavigate so we have to use navigate() instead of push().
            props.showAlert("OTP sent successfully, Check your mail.", "success");
            navigate("/otpverify");
        }
        else {
            props.showAlert("Email doesn't exist !!", "danger");
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
                            <h5 align="center" className="modal-title"><b> Forgot Password </b></h5>
                        </div>
                        <div className="modal-body">
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label"><b> Email Id </b></label>
                                        <input type="email" required className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                                    </div>

                                    <button style={{ width: "100%", backgroundColor: "blue" }} type="submit" className="btn btn-primary my-1"><b>Submit</b></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgotpassword