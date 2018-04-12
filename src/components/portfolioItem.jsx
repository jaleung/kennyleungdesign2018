import React, { Component } from "react";
import Axios from "axios";
import { baseUrl, urlMask } from "./global";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog
} from "material-ui/Dialog";
import { withRouter } from "react-router-dom";
import Button from "material-ui/Button";
// import Grow from "material-ui/transitions/Grow";
import Fade from 'material-ui/transitions/Fade';
// import Zoom from 'material-ui/transitions/Zoom';
import { CircularProgress } from "material-ui";
import Parser from "html-react-parser";
import Img from "react-image";
import { CSSTransitionGroup } from "react-transition-group";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const placeholderImgStyle = {
  textAlign: "center",
  minWidth: 300,
  paddingBottom: "56.25%",
  background: "#f1f1f1",
  position: "relative",
  margin: "8px auto"
};

const loadingStyle = {
  textAlign: "center",
  minWidth: 150,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
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
      }).then(resp => {
        this.setState({
          title: resp.data[0].title,
          body: resp.data[0].body,
          id: resp.data[0].uuid,
          loading: false
        });
      });
    } else {
      Axios.get(`${baseUrl}/portfolio/${currentPortfo}?_format=json`)
        .then(resp => {
          this.setState({
            title: resp.data[0].title,
            body: resp.data[0].body,
            id: resp.data[0].uuid,
            loading: false
          });
        })
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
    // return <Grow key={props.key} in {...props} timeout={{ enter: 500, exit: 500 }} />;
    // return <Zoom key={props.key} in {...props} timeout={{ enter: 500, exit: 500 }} />;
  return <Fade key={props.key} in {...props} timeout={{ enter: 400, exit: 300 }}/>;
  }

  render() {
    const { fullScreen } = this.props;
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
            fullScreen={fullScreen}
            transition={this.Transition}
          >
            <DialogTitle>
              {this.state.loading ? "Loading..." : this.state.title}
            </DialogTitle>
            <DialogContent className="portflioDialigContent">
              {this.state.loading ? (
                <div style={loadingStyle} className="modalSpinnerContainer">
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

PortfolioItem.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withRouter(withMobileDialog()(PortfolioItem));
