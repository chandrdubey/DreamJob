import React, { Component } from "react";
import axios from "axios";
import API from "../urls";
import { connect } from "react-redux";
import Spinner from "./Spinner";
class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allJobs: [],
      query: "",
      searchJobs:[]
    };
  }
  componentDidMount() {
    this.props.dispatch({ type: "LOADING" });
    axios.get(`${API}/jobs/all`).then((response) => {
      this.setState({ allJobs: response.data.data });
      this.props.dispatch({ type: "UNLOADING" });
    });
  }
  handleClick(job_id) {
  
    if (this.props.isLoggedIn) {
      const { user_id } = this.props.currentUser;
      const data = {
        user_id: user_id,
        job_id: job_id,
      };
      axios.post(`${API}/candidates/jobs/apply`, data).then((response) => {
        alert("Applied Succesfully");
      });
    }else{
      alert("You need to be looged in to apply");
    }
  }
  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.query) {
      this.props.dispatch({ type: "LOADING" });
      axios.get(`${API}/jobs/search/${this.state.query}`).then((response) => {
        console.log(response);
        this.setState({ allJobs: response.data.data });
        
      });
      this.props.dispatch({ type: "UNLOADING" });
    }
  };
  render() {
    return this.props.isLoading ? (
      <div className="mx-auto spinner-head ">
        <Spinner />
      </div>
    ) : (
      <div className="container mt-5">
        <div className="text-center">
          <h2>All Jobs</h2>
          <div className="formStyle mx-auto">
            <form
              className="form-inline my-2 my-lg-0"
              onSubmit={this.handleSubmit}
            >
              <input
                className="form-control mr-sm-2 mt-2"
                type="search"
                name="query"
                value={this.state.query}
                placeholder="Search by description, title, company_name"
                aria-label="Search"
                onChange={this.handleChange}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0 mt-2"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <hr />
        </div>
        <div className="row ">
          {this.state.allJobs && this.state.allJobs.length > 0 ? (
            this.state.allJobs.map((data) => (
              <div className="col-3 m-auto"  key={data.job_id} >
              <div className="card-len">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {data.company_name}
                    </h6>
                    <p className="card-text">{data.description} </p>
                    <h6>{data.city}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.handleClick(data.job_id)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
              </div>
            ))
          ) : (
            <h4>No Job Found</h4>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ userType, currentUser, isLoggedIn, isLoading }) => {
  return { userType, currentUser, isLoggedIn, isLoading };
};
export default connect(mapStateToProps)(Jobs);
