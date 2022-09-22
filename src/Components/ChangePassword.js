import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ChangePassword = (props) => {
    const [credentials, setCredentials] = useState({ currentpassword: "", newpassword: "", conpassword: "" });

    let navigate = useNavigate(); // We use this because useHistory has been replaced with useNavigate of react-router-dom.

    useEffect(() => {
        if (sessionStorage.getItem("token")) {

        }
        else {
            props.showAlert("⚠ Unauthorised action performed 😠😠 !!", "warning");
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.newpassword !== credentials.conpassword) {
            props.showAlert("Passwords are not equal ⚠", "danger");
        }
        else {
            // const response = await fetch("http://localhost:5000/api/auth/changepassword", {
                const response = await fetch("https://skynotes.herokuapp.com/api/auth/changepassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': sessionStorage.getItem("token")
                },
                body: JSON.stringify({ currentpassword: credentials.currentpassword, newpassword: credentials.newpassword })
            });
            const json = await response.json()
            console.log(json); // This is for testing only.
            if (json.success) {
                // Save the auth token and redirect.
                // sessionStorage.setItem('token', json.authtoken); // We use sessionStorage because it destroys data after ending session.
                // history.push("/"); // Since, useHistory() is replaced with useNavigate so we have to use navigate() instead of push().
                props.showAlert("Password changed successfully.", "success");
                navigate("/");
            }
            else {
                props.showAlert("Current password is incorrect !!", "danger");
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
                            <h5 className="modal-title"><b> Change Password </b></h5>
                        </div>
                        <div className="modal-body">
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="currentpassword" className="form-label"><b>Current Password</b></label>
                                        <input type="password" className="form-control" onChange={onChange} name="currentpassword" id="currentpassword" minLength={5} required />
                                    </div>
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

export default ChangePassword