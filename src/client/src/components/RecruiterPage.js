import React, { Component } from "react";
import axios from "axios";
import API from "../urls";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "./Spinner";
class RecruiterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allJobs: [],
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    const jwttoken = "Bearer " + token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: jwttoken,
      },
    };
    this.props.dispatch({
      type: "LOADING",
    });
    //console.log(config);
    const { user_id } = this.props.currentUser;
    //const data = { recruiter_id: 1 };
    axios.get(`${API}/recruiters/${user_id}/jobs`, config).then((response) => {
      console.log(response);
      this.setState({
        allJobs: response.data.result,
      });
      this.props.dispatch({
        type: "UNLOADING",
      });
     
    });
  }
  render() {
   // console.log(this.state.allJobs);
    return this.props.isLoading ? (
      <div className="mx-auto spinner-head ">
        <Spinner />
      </div>
    ) : (
      <div className="container mt-5">
        <div className="text-center">
        <Link className="btn btn-primary" to={`/jobs/new`}>
          Add new job
        </Link>
        <h2>ALL Previews Jobs</h2>
        <hr/>
        </div>
        <div className="row ">
          {this.state.allJobs.length > 0 ? (
            this.state.allJobs.map((data) => (
              <div key={data.job_id} className="card-len">
                <div className="card" >
                  <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{data.company_name}</h6>
                    <p className="card-text">
                       {data.description}
                    </p>
                    <h6>{data.city}</h6>
                    <Link className="btn btn-primary" to={`/jobs/${data.job_id}/candidates`}>
                          View all candidates
                    </Link>
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
  return {
    userType,
    currentUser,
    isLoggedIn,
    isLoading,
  };
};
export default connect(mapStateToProps)(RecruiterPage);
