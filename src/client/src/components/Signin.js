import React, { Component } from "react";
import axios from "axios";
import API from "../urls"
import {connect} from "react-redux";
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
          userType: !this.props.userType
        };
       console.log(data);
       axios.post(`${API}/signin`, data).then((response) => { 
         console.log(response);
       });
      };
  render() {
   console.log(this.props.userType)
    return (
      <div className="container">
          <div className="formStyle text-center mx-auto">
        <form
          className="form-style mt-5 "
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
const mapStateToProps = ({ userType }) => {
  return {
    userType,
  };
};
export default connect(mapStateToProps) (Signin);
