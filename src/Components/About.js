import React from 'react';

const About = () => {
  // props.showAlert("Welcome to SkyNotes", "success");
  return (
    <>
      <h1 style={{ backgroundColor: "#101069",color: "white" }} align="center">Few facts about SkyNotes</h1>
      <div style={{ backgroundColor: "#09c4ff",color:"black" }}>
        <h6 style={{ fontFamily: "monospace", fontSize: "25px", fontWeight: "bold" }} align="left">1. SkyNotes is developed as a React Project with CRUD Operation.</h6>
        <h6 style={{ fontFamily: "monospace", fontSize: "25px", fontWeight: "bold" }} align="left">2. You can save your notes here.</h6>
        <h6 style={{ fontFamily: "monospace", fontSize: "25px", fontWeight: "bold" }} align="left">3. You can also use it as a todo.</h6>
        <h6 style={{ fontFamily: "monospace", fontSize: "25px", fontWeight: "bold" }} align="left">4. You can add your task and delete it after completing the task.</h6>
      </div>

      <div style={{ backgroundColor: "#101069",color: "white" }} className="my-1">
        <h2 align="center"> For any query or feedback:</h2>
      </div>
        <h3 style={{ backgroundColor: "#09c4ff",color:"black" }} align="center"> Send Mail: <a style={{ color: "blue", textDecoration: "none"}} href="mailto:vickyjha256@gmail.com">Click to send mail</a> </h3>
    </>
  )
}

export default About;