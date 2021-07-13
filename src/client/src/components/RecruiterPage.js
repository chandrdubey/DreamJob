import React, { Component } from 'react'
import axios from "axios";
import API from "../urls"
import {Redirect} from "react-router-dom"
import { connect } from "react-redux";
class RecruiterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          allJobs: [],
        };
      }
    componentDidMount (){
        // const token = localStorage.getItem("token");
        // const jwttoken = "Bearer " + token;
    
        // const config = {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: jwttoken,
        //   },
        // };
        const {user_id} = this.props.currentUser;
        const data = {recruiter_id : 1}
        axios
      .get(`${API}/recruiters/1/jobs`,data)
      .then((response) => {
          this.setState({
              allJobs:response.data.result
          });
          console.log(response.data.result);

    //     this.props.dispatch({
    //       type: "ALL JOBS RECRUITER",
    //       payload: response.data.data.favcharecters,
    //     });
    //  
       })

    }
    render() {
       // console.log(this.state.allJobs);
        return (
            <div className="container text-center">
                Rcruiter Page
                <div>sdasdas</div>
            </div>
            
        )
    }
}
const mapStateToProps = ({ userType, currentUser, isLoggedIn }) => {
    return {
      userType,
      currentUser,
      isLoggedIn
    };
  };
export default connect(mapStateToProps)(RecruiterPage);