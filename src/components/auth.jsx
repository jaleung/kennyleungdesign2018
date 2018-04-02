import { Link } from "react-router-dom";
import React, { Component } from "react";

class AuthBtn extends Component {
  componentWillReceiveProps() {
    this.forceUpdate(this.render())
  }
  render() {
    var loggedIn = localStorage.getItem("auth");
    if (loggedIn) {
      return (
        <Link to="/logout">Logout</Link>
      )
    } else {
      return (
        <Link to="/login">Login</Link>
      )
    }
  }
}

export default AuthBtn;