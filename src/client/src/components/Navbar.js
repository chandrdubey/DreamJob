import React, {Component} from 'react'
import {NavLink, Link} from "react-router-dom";
class Navbar extends Component {
    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                    <div className="container">
                        <Link className="navbar-brand" to='/jobs' >DreamJob</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav float-">
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/signin">SignIn</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">SignUp</NavLink>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signin">For Employers</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}
export default Navbar;
