import React, { Component } from "react";

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
        console.log(event.target);
      };
  render() {
    return (
      <div class="container">
          <div className="">
        <form
          className="form-style mt-5 mx-auto auth1"
          onSubmit={this.handleOnSubmit}
        >
          <h3 className="text-center">Sign In</h3>
          <div className="form-group">
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
          <div className="form-group">
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
export default Signin;
