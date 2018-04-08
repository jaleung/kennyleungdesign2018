import React, { Component } from "react";
import Axios from "axios";
import { baseUrl, urlMask } from "./global";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { withRouter } from "react-router-dom";
import Button from "material-ui/Button";
import Grow from "material-ui/transitions/Grow";
import { CircularProgress } from "material-ui";
import Parser from "html-react-parser";
import Img from "react-image";
import { CSSTransitionGroup } from "react-transition-group";
import { Redirect } from "react-router-dom";

const placeholderImgStyle = {
  textAlign: "center",
  minWidth: 300,
  paddingBottom: "56.25%",
  background: "#f1f1f1",
  position: "relative"
};

const transHTML = dom => {
  if (dom.type === "tag" && dom.name === "img") {
    return (
      <Img
        src={urlMask(dom.attribs.src)}
        loader={
          <div style={placeholderImgStyle}>
            <CircularProgress
              style={{
                position: "absolute",
                top: "calc(50% - 20px)",
                left: "calc(50% - 20px)"
              }}
            />
          </div>
        }
      />
    );
  }
};

class PortfolioItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true,
      loading: true,
      redirect: false
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ modalOpen: false }, () => {
      setTimeout(() => {
        this.props.history.push("/");
      }, 300);
    });
  }

  getPortfolio() {
    this.setState({});
    let auth = localStorage.getItem("auth");
    let currentPortfo = this.props.match.params.portfoTitle;
    if (auth != null) {
      Axios.get(`${baseUrl}/portfolio/${currentPortfo}?_format=json`, {
        headers: { Authorization: "Basic " + auth }
      })
        .then(resp => {
          this.setState({
            title: resp.data[0].title,
            body: resp.data[0].body,
            id: resp.data[0].uuid,
            loading: false
          });
        });
    } else {
      Axios.get(`${baseUrl}/portfolio/${currentPortfo}?_format=json`).then(
        resp => {
          this.setState({
            title: resp.data[0].title,
            body: resp.data[0].body,
            id: resp.data[0].uuid,
            loading: false
          });
        }
      )
      .catch(error => {
        this.setState({
          redirect: true
        });
      });
    }
  }

  componentDidMount() {
    this.getPortfolio();
  }

  Transition(props) {
    return <Grow key={props.key} in {...props} />;
  }

  render() {
    console.log(this.state.redirect)
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div>
          <Dialog
            maxWidth="md"
            key={this.state.id}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            className="portfolioDialog"
            transition={this.Transition}
          >
            <DialogTitle>
              {this.state.loading ? "Loading..." : this.state.title}
            </DialogTitle>
            <DialogContent className="portflioDialigContent">
              {this.state.loading ? (
                <div style={{ textAlign: "center", minWidth: 300 }}>
                  <CircularProgress style={{ color: "#fff" }} />
                </div>
              ) : (
                <CSSTransitionGroup
                  key={this.state.id}
                  transitionName="fade"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnter={false}
                  transitionLeave={false}
                >
                  <div>
                    {Parser(this.state.body, {
                      replace: domNode => transHTML(domNode)
                    })}
                  </div>
                </CSSTransitionGroup>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Back</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
}

export default withRouter(PortfolioItem);
