import  { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Jobs from './components/Jobs';
import RecruiterPage from './components/RecruiterPage';
import NewJob from './components/NewJob';
import Candidates from './components/Candidates';
import jwt from "jwt-decode";
import { connect } from "react-redux";
import "./App.css";
class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt(token); 
      this.props.dispatch({
        type: "CHANGE USER TYPE",
        payload: decoded.userType,
      });
      const data = { user_id: decoded.id, name:""};
      this.props.dispatch({
        type: "SIGN IN",
        payload: data,
      }); 
    }
  }
  render() {
    
    return (
      <div>
         <Navbar/>
         <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path= "/jobs/new" exact component={NewJob}/>
          <Route path="/jobs/:id/candidates" exact component={Candidates} />
          <Route path="/jobs" exact component={Jobs} />
          <Route path= "/recruiters/:id" component={RecruiterPage}/>
          </Switch>
      </div>
    )
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
export default connect(mapStateToProps)(App);
