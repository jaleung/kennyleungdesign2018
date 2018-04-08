import React, { Component } from "react";
import axios from "axios";
import Recaptcha from "react-recaptcha";
import { baseUrl } from "./global";
import ScrollableAnchor from "react-scrollable-anchor";
import LazyLoad from "react-lazyload";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui";
import Grid from "material-ui/Grid";

let recaptchaInstance;

const resetRecaptcha = () => {
  recaptchaInstance.reset();
};

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      subject: "Website Enquiry",
      message: "",
      captcha: false,
      success: "",
      error: "",
      sending: false,
      disabled: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({
      [key]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var self = this;
    this.setState({ sending: true, disabled: true });

    axios
      .post(`${baseUrl}/contact_message?_format=json`, {
        contact_form: [{ target_id: "feedback" }],
        name: [{ value: this.state.name }],
        mail: [{ value: this.state.email }],
        subject: [{ value: this.state.subject }],
        message: [{ value: this.state.message }]
      })
      .then(function(response) {
        self.setState({
          success: "Message sent",
          error: "",
          sending: false,
          disabled: false,
          message: "",
          name: "",
          email: ""
        });
        resetRecaptcha();
      })
      .catch(function(error) {
        var errorResponse = error.response.data.message;
        errorResponse = errorResponse.replace(/(?:\r\n|\r|\n)/g, "<br />");

        self.setState({
          success: "",
          error: errorResponse,
          sending: false,
          disabled: false
        });
      });
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "//www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);
  }

  fieldsFilled() {
    return (
      this.state.name !== "" &&
      this.state.email !== "" &&
      this.state.message !== ""
    );
  }

  render() {
    return (
      <ScrollableAnchor id={"contact"}>
        <LazyLoad>
          <div className="modular-row contact">
            <Typography variant="headline">Contact</Typography>
            <Grid container>
              <Grid item lg={5} xs={12}>
                <form onSubmit={this.handleSubmit}>
                  <TextField
                    label="Your Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                    fullWidth
                    autoComplete="name"
                    margin="normal"
                  />
                  <TextField
                    name="email"
                    label="Your Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                    type="email"
                    fullWidth
                    autoComplete="email"
                    margin="normal"
                  />
                  <TextField
                    name="message"
                    label="Your Message"
                    value={this.state.message}
                    onChange={this.handleChange}
                    fullWidth
                    required
                    multiline
                    rows="4"
                    className="form-control"
                    margin="normal"
                  />
                  <div className="margin-top margin-bottom">
                    <Recaptcha
                      render="explicit"
                      theme="dark"
                      ref={e => (recaptchaInstance = e)}
                      verifyCallback={() => this.setState({ captcha: true })}
                      expiredCallback={() =>
                        this.setState({
                          captcha: false
                        })
                      }
                      sitekey="6LfMeFEUAAAAABnwb-NJvB0BxAlcFExMSa-0DjEi"
                    />
                  </div>
                  <Button
                    variant="raised"
                    type="submit"
                    disabled={
                      this.state.captcha === false ||
                      this.state.disabled === true ||
                      !this.fieldsFilled()
                        ? true
                        : null
                    }
                    className="btn btn-primary"
                  >
                    {this.state.sending ? (
                      <CircularProgress style={{ color: "#fff" }} size={20} />
                    ) : (
                      "Send"
                    )}
                  </Button>
                  <div className="form-group messages">
                    <p className="success">{this.state.success}</p>
                    <p
                      className="error"
                      dangerouslySetInnerHTML={{ __html: this.state.error }}
                    />
                  </div>
                </form>
              </Grid>
            </Grid>
          </div>
        </LazyLoad>
      </ScrollableAnchor>
    );
  }
}

export default Contact;
