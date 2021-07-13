import React, {Component} from 'react'
import {NavLink, Link} from "react-router-dom";
import { connect} from "react-redux";
class Navbar extends Component {
    
    handleClick = ()=>{
        this.props.dispatch({
            type: "CHANGE USER TYPE",
            payload: !this.props.userType,
          });
          
    }
    render() {
       console.log(this.props.userType);
        return (
            <>
            {!this.props.userType ? (
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
                                    <button className="nav-link" onClick={this.handleClick}>For Employers</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            ) :( <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="container">
                <Link className="navbar-brand" to='/login' >DreamJob</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav float-">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signup">SignUp</NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={this.handleClick}>Job Seekers</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>)}
           </>
        )
    }
}
const mapStateToProps = ({ userType }) => {
    return {
      userType,
    };
  };
  export default connect(mapStateToProps)(Navbar);