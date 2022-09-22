import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import Navbar from './Components/Navbar';
import NoteState from './Context/Notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';
import Forgotpassword from './Components/Forgotpassword';
import Otpverify from './Components/Otpverify';
import Resetpassword from './Components/Resetpassword';
import ChangePassword from './Components/ChangePassword';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route exact path="/forgotpassword" element={<Forgotpassword showAlert={showAlert}/>} />
              <Route exact path="/otpverify" element={<Otpverify showAlert={showAlert} />} />
              <Route exact path="/resetpassword" element={<Resetpassword showAlert={showAlert} />} />
              <Route exact path="/changepassword" element={<ChangePassword showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
