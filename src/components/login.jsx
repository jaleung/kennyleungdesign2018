import React, { Component } from "react";
import axios from "axios";
import Dialog, {
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { Redirect } from "react-router-dom";
import Slide from "material-ui/transitions/Slide";
import { baseUrl } from "./global.jsx";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      success: "",
      error: "",
      redirect: false,
      modalOpen: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({
      [key]: value
    });
  }

  handleClose() {
    this.setState({ modalOpen: false }, () => {
      setTimeout(() => {
        this.props.history.push("/");
      }, 300);
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    var self = this;

    axios
      .post(`${baseUrl}/user/login?_format=json`, {
        name: this.state.name,
        pass: this.state.password
      })
      .then(function(response) {
        self.setState({
          success: "Login successful",
          error: ""
        });

        localStorage.setItem("username", response.data.current_user.name);
        localStorage.setItem("uid", response.data.current_user.uid);
        localStorage.setItem("csrf_token", response.data.csrf_token);
        localStorage.setItem("logout_token", response.data.logout_token);
        localStorage.setItem(
          "auth",
          window.btoa(self.state.name + ":" + self.state.password)
        );

        self.setState({ redirect: true });
        self.forceUpdate();
      })
      .catch(function(error) {
        var errorResponse = error.response.data.message;
        errorResponse = errorResponse.replace(/(?:\r\n|\r|\n)/g, "<br />");
        self.setState({
          success: "",
          error: errorResponse
        });
      });
  }

  Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <Dialog
        maxWidth="xs"
        key="login"
        open={this.state.modalOpen}
        onClose={this.handleClose}
        transition={this.Transition}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <TextField
              label="username"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
              fullWidth
              placeholder="Enter username"
            />
            <TextField
              label="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
              fullWidth
              type="password"
              placeholder="Enter password"
            />
            <Button variant="raised" style={{ marginTop: 24 }} fullWidth type="submit">Login</Button>
            <div>
              <p>{this.state.success}</p>
              <p dangerouslySetInnerHTML={{ __html: this.state.error }} />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

export default Login;
