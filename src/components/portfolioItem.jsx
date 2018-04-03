import React, { Component } from "react";
import Axios from "axios";
import { baseUrl } from "./global";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { withRouter } from "react-router-dom";
import Button from "material-ui/Button";
import Slide from "material-ui/transitions/Slide";

class PortfolioItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState(
      { modalOpen: false }, () => {
      setTimeout(() => {
        this.props.history.push("/");
      }, 300)
      }
    );
  }

  getPortfolio() {
    this.setState({});
    let auth = localStorage.getItem("auth");
    let currentPortfo = this.props.match.params.portfoTitle;
    if (auth != null) {
      Axios.get(`${baseUrl}/portfolio/${currentPortfo}?_format=json`, {
        headers: { Authorization: "Basic " + auth }
      }).then(resp => {
        this.setState({
          title: resp.data[0].title,
          body: resp.data[0].body
        });
      });
    } else {
      Axios.get(`${baseUrl}/portfolio/${currentPortfo}?_format=json`).then(
        resp => {
          this.setState({
            title: resp.data[0].title,
            body: resp.data[0].body
          });
        }
      );
    }
  }

  componentDidMount() {
    this.getPortfolio();
    console.log(this.state.modalOpen);
  }

  Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  render() {
    return (
      <div>
        <Dialog
          maxWidth="md"
          open={this.state.modalOpen}
          onClose={this.handleClose}
          className="portfolioDialog"
          transition={this.Transition}
        >
          <DialogTitle>{this.state.title}</DialogTitle>
          <DialogContent className="portflioDialigContent">
            <div dangerouslySetInnerHTML={{ __html: this.state.body }} />
          </DialogContent>
          <DialogActions>
              <Button onClick={this.handleClose}>Back</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(PortfolioItem);
