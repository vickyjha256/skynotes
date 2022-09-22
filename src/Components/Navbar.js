import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    let navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        // sessionStorage.clear();
        navigate("/login");
    }
    let location = useLocation();

    return (
        <>
            <div className="my-2">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/"><b>SkyNotes</b></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className='navbar-toggler-icon'></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                                </li>
                            </ul>
                            {sessionStorage.getItem("token") ? <>
                                <Link style={{backgroundColor: "black"}} className="btn btn-primary mx-3" to="/changepassword" role="button">Change Password</Link>
                                {/* <button className="btn btn-primary"> Change Password</button> */}
                                <button onClick={handleLogout} className="btn btn-danger"> Log Out</button>
                            </> : <form className="d-flex">
                                {/* <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                                <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link> */}
                            </form>}
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar