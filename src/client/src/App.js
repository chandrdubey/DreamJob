import  { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Jobs from './components/Jobs';
import RecruiterPage from './components/RecruiterPage';
import "./App.css";
class App extends Component {
  
  render() {
    return (
      <div>
         <Navbar/>
         <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/jobs" component={Jobs} />
          <Route path= "/recruiters/:id" component={RecruiterPage}/>

          {/* <Route  path ='/comics/:id'  component={ComicPage} /> */}
          </Switch>
      </div>
    )
  }
}

export default App;
