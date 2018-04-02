import { Link } from "react-router-dom";
import React, { Component } from "react";

const style = {
  position: 'absolute',
  bottom: 0,
  right: 0
}
class AuthBtn extends Component {
  componentWillReceiveProps() {
    this.forceUpdate(this.render())
  }
  render() {
    var loggedIn = localStorage.getItem("auth");
    if (loggedIn) {
      return (
        <Link style={style} to="/logout">Logout</Link>
      )
    } else {
      return (
        <Link style={style} to="/login">Login</Link>
      )
    }
  }
}

export default AuthBtn;