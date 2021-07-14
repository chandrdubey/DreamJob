import React, { Component } from "react";
import axios from "axios";
import API from "../urls";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class NewJob extends Component {
  constructor() {
    super();
    this.state = {
        title:"",
        description:"",
        company_name:"",
        city:"",
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
    const recruiter_id = this.props.currentUser.user_id;
    const data = {
        title: this.state.title,
        description: this.state.description,
        company_name: this.state.company_name,
        city: this.state.city,
        recruiter_id:1
    };
    const token = localStorage.getItem("token");
    const jwttoken = "Bearer " + token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: jwttoken,
      },
    };
    console.log(config);
     this.props.history.push(`/recruiters/${recruiter_id}`);
    axios.post(`${API}/jobs/new`, data, config).then((response) => {
         console.log(response);
    })
    this.props.history.push(`/recruiters/${recruiter_id}`);
   // console.log(data);
  };

  render() {
    
    return (
      <div className="container">
        <div className="formStyle text-center mx-auto">
          <form
            className="form-style mt-3 "
            onSubmit={this.handleOnSubmit}
          >
            <h3 className="text-center">New Job</h3>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                name="title"
                value={this.state.title}
                placeholder="Title"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                name="description"
                value={this.state.description}
                placeholder="Description"
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
                type="text"
                className="form-control"
                name="company_name"
                value={this.state.company_name}
                placeholder="company_name"
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className=" btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ userType, currentUser, isLoggedIn, isLoading }) => {
    return {
      userType,
      currentUser,
      isLoggedIn,
      isLoading
    };
  };
export default connect(mapStateToProps)(NewJob);
