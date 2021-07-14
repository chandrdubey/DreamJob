import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import API from "../urls";
import {Redirect} from "react-router-dom"
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      confirm_password: "",
      email: "",
      city: "",
      mobile_number: "",
      company_name: "",
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleOnSubmitJobSeeeker = (event) => {
    event.preventDefault();
     
    const data = {
      password: this.state.password,
      email: this.state.email,
      name:this.state.name,
      confirm_password: this.state.confirm_password,
      city: this.state.city,
      mobile_number: this.state.mobile_number,
      userType: this.props.userType
    };
    // console.log(data);
       axios.post(`${API}/signup`, data).then((response) => {
        console.log(response);
        if(response.data.status === 200){
            localStorage.setItem("token", response.data.token);
            this.props.dispatch({
              type: "SIGN IN",
              payload: response.data.data.user_detail,
            }); 
            
           }else{
             console.log(response.data.token);
           }
       });
       
  };
  handleOnSubmitEmployer= (event) => {
    event.preventDefault();

    const data = {
      password: this.state.password,
      email: this.state.email,
      name:this.state.name,
      confirm_password: this.state.confirm_password,
      company_name: this.state.company_name,
      userType: this.props.userType
    };
       axios.post(`${API}/signup`, data).then((response) => {
         if(response.data.status === 200){
            localStorage.setItem("token", response.data.token);
            this.props.dispatch({
              type: "SIGN IN",
              payload: response.data.data.user_detail,
            }); 
            
           }else{
             console.log(response.data);
           }
       });
       
  };
  render() {
    // console.log(this.props.isLoggedIn);
    // console.log(this.props.currentUser);
    if(this.props.isLoggedIn){
        if(this.props.userType)
        {
          return <Redirect to={`/recruiters/${this.props.currentUser.user_id}`} />;
        }
        else{
          return <Redirect to="/jobs" />;
        }
    }
    return   !this.props.userType ? 
   
    // FOR JOB SEEKERS
    (
      <div className="container">
        <div className="formStyle text-center mx-auto">
        <h4> One step away from finding your dream job </h4>
          <form
            className="form-style mt-3 "
            onSubmit={this.handleOnSubmitJobSeeeker}
          >
            <h3 className="text-center">Sign Up for JobSeekers</h3>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                aria-describedby="name"
                placeholder="Enter your name"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                aria-describedby="emailHelp"
                placeholder="Email"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                name="city"
                value={this.state.city}
                aria-describedby="emailHelp"
                placeholder="City"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="number"
                className="form-control"
                name="mobile_number"
                value={this.state.mobile_number}
                aria-describedby="Help"
                placeholder="Mobile Number"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Password"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                name="confirm_password"
                value={this.state.confirm_password}
                onChange={this.handleChange}
                placeholder="Confirm Password"
              />
            </div>

            <button type="submit" className="btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>) : 

    //   FOR EMPLOYER

      (<div className="container">
        <div className="formStyle text-center mx-auto">
        <h4> Hiring is Simpler, Smarter & Faster with DreamJob </h4>
          <form
            className="form-style mt-3 "
            onSubmit={this.handleOnSubmitEmployer}
          >
            <h3 className="text-center">Sign Up for Recruiters</h3>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                aria-describedby="name"
                placeholder="Contact Name"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                aria-describedby="emailHelp"
                placeholder="Email"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                name="company_name"
                value={this.state.company_name}
                aria-describedby="emailHelp"
                placeholder="Company Name"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Password"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                name="confirm_password"
                value={this.state.confirm_password}
                onChange={this.handleChange}
                placeholder="Confirm Password"
              />
            </div>

            <button type="submit" className="btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      );
  }
}
const mapStateToProps = ({ userType, isLoggedIn , currentUser}) => {
  return {
    userType,
    isLoggedIn,
    currentUser,
  };
};
export default connect(mapStateToProps)(Signup);
