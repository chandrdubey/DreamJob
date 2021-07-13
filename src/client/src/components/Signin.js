import React, { Component } from "react";
import axios from "axios";
import API from "../urls"
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"
class Signin extends Component {
    constructor() {
        super();
        this.state = {
          password: "",
          email: "",
        };
      }
      handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
          [name]: value,
        });
      };
      handleOnSubmit = (event) => {
        event.preventDefault();
        const data = {
          password: this.state.password,
          email: this.state.email,
          userType: this.props.userType
        };
      // console.log(data);
       axios.post(`${API}/signin`, data).then((response) => { 
         console.log(response);
         console.log(response.data.data.user_detail);
         //console.log(this.props.dispatch)
         if(response.data.status === 200){
          this.props.dispatch({
            type: "SIGN IN",
            payload: response.data.data.user_detail,
          }); 
          localStorage.setItem("token", response.data.token);
         }else{
           console.log(response.data.status.message);
         }
        
        console.log(this.props.currentUser);
       });
      };
  render() {
    if(this.props.isLoggedIn){
          if(this.props.userType)
          {
            return <Redirect to={`/recruiters/${this.props.currentUser.user_id}`} />;
          }
          else{
            return <Redirect to="/jobs" />;
          }
    }
    return (
      <div className="container text-center">
          {this.props.userType ?( <h4> Hiring is Simpler, Smarter & Faster with DreamJob </h4>) :( <h4> Find your dream job </h4>)}  
          <div className="formStyle  mx-auto">
        <form
          className="form-style mt-3 "
          onSubmit={this.handleOnSubmit}
        >
          <h3 className="text-center">Sign In</h3>
          <div className="form-group mb-2">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={this.state.email}
              aria-describedby="emailHelp"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              id="exampleInputPassword1"
              onChange={this.handleChange}
              placeholder="Password"
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
const mapStateToProps = ({ userType, currentUser, isLoggedIn }) => {
  return {
    userType,
    currentUser,
    isLoggedIn
  };
};
export default connect(mapStateToProps) (Signin);
