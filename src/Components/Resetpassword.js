import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Resetpassword = (props) => {
    const [credentials, setCredentials] = useState({ newpassword: "", conpassword: "" });

    let navigate = useNavigate(); // We use this because useHistory has been replaced with useNavigate of react-router-dom.

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.newpassword !== credentials.conpassword) {
            props.showAlert("Passwords are not equal ⚠", "danger");
        }
        else {
            // const response = await fetch("http://localhost:5000/api/auth/resetpassword", {
                const response = await fetch("https://skynotes.herokuapp.com/api/auth/resetpassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newpassword: credentials.newpassword, conpassword: credentials.conpassword })
            });
            const json = await response.json()
            // console.log(json); // This is for testing only.
            if (json.success) {
                // Save the auth token and redirect.
                // sessionStorage.setItem('token', json.authtoken); // We use sessionStorage because it destroys data after ending session.
                // history.push("/"); // Since, useHistory() is replaced with useNavigate so we have to use navigate() instead of push().
                props.showAlert("Password changed successfully.", "success");
                navigate("/");
            }
            else {
                props.showAlert("⚠ Unauthorised action performed 😠😠 !!", "warning");
                navigate("/login");
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
                            <h5 className="modal-title"><b> Reset Password </b></h5>
                        </div>
                        <div className="modal-body">
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="newpassword" className="form-label"><b>New Password</b></label>
                                        <input type="password" className="form-control" onChange={onChange} name="newpassword" id="newpassword" minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="conpassword" className="form-label"> <b> Confirm Password</b></label>
                                        <input type="password" className="form-control" onChange={onChange} name="conpassword" id="conpassword" minLength={5} required />
                                    </div>

                                    <button style={{ width: "100%", backgroundColor: "blue" }} type="submit" className="btn btn-primary"><b>Submit</b></button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Resetpassword