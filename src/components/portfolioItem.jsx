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
import LazyLoad from "react-lazyload";
import { CircularProgress } from "material-ui";
import Parser from 'html-react-parser';
import Img from "react-image";

const transHTML = (dom) => {
  if (dom.type ==='tag' && dom.name === 'img') {
    return (
      <Img 
        src={dom.attribs.src} 
        loader={<CircularProgress color="red"/>} />
    )
  }
}

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
    if (!this.state.loading) {
    console.log(Parser(this.state.body, {
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'img') {
          console.log('found img!')
          console.log(domNode);
        }
      }
    }));
    }
    return (
      <div>
        <Dialog
          maxWidth="md"
          open={this.state.modalOpen}
          onClose={this.handleClose}
          className="portfolioDialog"
          transition={this.Transition}
        >
          <DialogTitle> {this.state.title} </DialogTitle>
          <DialogContent className="portflioDialigContent">
            <LazyLoad height={500}>
              {this.state.loading ? (<p>Loading...</p>) : (Parser(this.state.body, {
                replace: (domNode) => transHTML(domNode)
              }))}
            </LazyLoad>
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
