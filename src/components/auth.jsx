import { Link } from "react-router-dom";
import React, { Component } from "react";
import Typography from "material-ui/Typography";
import blue from "material-ui/colors/blue";
import green from "material-ui/colors/green";
import Button from "material-ui/Button";
import Icon from "material-ui/Icon";
import LoginIcon from "@material-ui/icons/Lock";
import LogoutIcon from "@material-ui/icons/DirectionsRun";

class AuthBtn extends Component {
  componentWillReceiveProps() {
    this.forceUpdate();
  }
  render() {
    var loggedIn = localStorage.getItem("auth");
    var dataLoaded = this.props.loaded;
    if (!dataLoaded) {
      return "";
    } else {
      return (
        <Link to={loggedIn ? "/logout" : "/login"}>
          <Button style={{background: green[700]}}>
            {loggedIn ? <LogoutIcon /> : <LoginIcon />}
            {loggedIn ? "Logout" : "Login"}
          </Button>
        </Link>
      );
    }
  }
}

export default AuthBtn;
