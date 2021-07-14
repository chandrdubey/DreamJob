import React, { Component } from 'react'
import axios from "axios";
import API from "../urls";
import { Redirect} from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "./Spinner";
 class candidates extends Component {
    constructor(props) {
        super(props);
        this.state = {
          allcandidates: [],
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
        const {
            match: { params },
          } = this.props;
        const job_id = params.id;
        //console.log(this.params);
        const { user_id } = this.props.currentUser;
        //const data = { recruiter_id: 1 };
        axios.get(`${API}/recruiters/${user_id}/jobs/${job_id}/candidates`,config).then((response) => {
          console.log(response);
          this.setState({
            allcandidates: response.data.result,
          });
          this.props.dispatch({
            type: "UNLOADING",
          });
         
        });
      }
    render() {
      if(!this.props.isLoggedIn){
        return <Redirect to="/signin"/>
      }
        return this.props.isLoading ? (
            <div className="mx-auto spinner-head ">
              <Spinner />
            </div>
          ) : (
            <div className="container mt-5">
              <div className="text-center">
              <h2>ALL Candidates</h2>
              <hr/>
              </div>
              <div className="row ">
                {this.state.allcandidates && this.state.allcandidates.length > 0 ? (
                  this.state.allcandidates.map((data) => (
                    <div className="col-3 m-auto" key={data.user_id} >
                    <div className="card-len">
                      <div className="card" >
                        <div className="card-body">
                          <h5 className="card-title">Name: {" "+data.name}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">Email:{" "+ data.email}</h6>
                          <p className="card-text">
                             Phone: {" "+data.mobile_number}
                          </p>
                          <h6>City: {" "+data.city}</h6>
                        </div>
                      </div>
                    </div>
                    </div>
                  ))
                ) : (
                  <h4>No Candidate applied yet</h4>
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
export default  connect(mapStateToProps)(candidates);