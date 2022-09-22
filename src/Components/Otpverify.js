import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Otpverify = (props) => {
  const [credentials, setCredentials] = useState({ otp: "" });

  let navigate = useNavigate(); // We use this because useHistory has been replaced with useNavigate of react-router-dom.

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await fetch("http://localhost:5000/api/auth/otpverify", {
      const response = await fetch("https://skynotes.herokuapp.com/api/auth/otpverify", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ otp: credentials.otp })
      });
      const json = await response.json()
      // console.log(json); // This is for testing only.
      if (json.success) {
          // Save the auth token and redirect.
          // sessionStorage.setItem('token', json.authtoken); // We use sessionStorage because it destroys data after ending session.
          // history.push("/"); // Since, useHistory() is replaced with useNavigate so we have to use navigate() instead of push().
          props.showAlert("OTP verified successfully.", "success");
          navigate("/resetpassword");
      }
      else {
          props.showAlert("Invalid OTP ⚠", "warning");
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
              <h5 align="center" className="modal-title"><b> User Verification </b></h5>
            </div>
            <div className="modal-body">
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label"><b> Enter OTP </b></label>
                    <input type="number" required className="form-control" value={credentials.otp} onChange={onChange} id="otp" name="otp" aria-describedby="emailHelp" />
                  </div>

                  <button style={{ width: "100%", backgroundColor: "blue" }} type="submit" className="btn btn-primary my-1"><b>Verify</b></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Otpverify