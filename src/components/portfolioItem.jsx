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
import Slide from "material-ui/transitions/Slide";
import { CircularProgress } from "material-ui";
import Parser from "html-react-parser";
import Img from "react-image";
import hold, { holders, align } from "react-hold";
import { CSSTransitionGroup } from "react-transition-group";

const placeholderImgStyle = {
  textAlign: 'center',
  minWidth: 300,
  paddingBottom: '56.25%',
  background: '#f1f1f1',
  position: 'relative'
}

const transHTML = dom => {
  if (dom.type === "tag" && dom.name === "img") {
    return <Img src={urlMask(dom.attribs.src)} loader={<div style={placeholderImgStyle}>
            <CircularProgress style={{ position: "absolute", top: "calc(50% - 20px)", left: "calc(50% - 20px)" }} />
          </div>} />;
  }
};

const Div = hold("div", props => !props.children);

class PortfolioItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true,
      loading: true
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
          loading: false
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
          <DialogTitle>
            <Div holder={holders.Text} props={{ length: 30 }}>
              {this.state.title}
            </Div>
          </DialogTitle>
          <DialogContent className="portflioDialigContent">
            {this.state.loading ? (
              <div style={{ textAlign: "center" }}>
                <CircularProgress style={{ color: "#fff" }} />
              </div>
            ) : (
              <CSSTransitionGroup
                key="1"
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

export default withRouter(PortfolioItem);
