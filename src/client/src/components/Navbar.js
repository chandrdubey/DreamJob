import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
class Navbar extends Component {
  handleClick = () => {
    this.props.dispatch({
      type: "CHANGE USER TYPE",
      payload: !this.props.userType,
    });
  };
  handleLogOut = () => {
    this.props.dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
  };
  render() {
    console.log(this.props.userType);

    return (
      <>
        {!this.props.userType ? (
          <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="container">
              <Link className="navbar-brand" to="/">
                DreamJob
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav float-">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/jobs"
                    >
                      Jobs
                    </NavLink>
                  </li>
                  {this.props.isLoggedIn ? (
                    <li className="nav-item" onClick={this.handleLogOut}>
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/signin"
                      >
                        Logout
                      </NavLink>
                    </li>
                  ) : ( 
                    <>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          aria-current="page"
                          to="/signin"
                        >
                          SignIn
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">
                          SignUp
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link nav-button"
                          onClick={this.handleClick}
                        >
                          For Employers
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        ) : (
          <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="container">
              <Link className="navbar-brand" to="/signin">
                DreamJob
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav float-">
                {this.props.isLoggedIn ? (
                    <li className="nav-item" onClick={this.handleLogOut}>
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/signin"
                      >
                        Logout
                      </NavLink>
                    </li>
                  ) : ( 
                    <>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          aria-current="page"
                          to="/signin"
                        >
                          SignIn
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">
                          SignUp
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <button
                          className="nav-link nav-button"
                          onClick={this.handleClick}
                        >
                          For JobSeekers 
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        )}
      </>
    );
  }
}
const mapStateToProps = ({ userType, isLoggedIn, currentUser }) => {
  return {
    userType, isLoggedIn, currentUser,
  };
};
export default connect(mapStateToProps)(Navbar);
