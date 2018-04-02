
import React, { Component } from "react";
import Axios from "axios"
import { baseUrl } from "./global"
import { BrowserRouter as Link } from "react-router-dom";

class PortfolioItem extends Component {
  state = {};

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
  }
  render() {
    return (
      <div>
        <Link to={`/`}>Back</Link>
        <h1>{this.state.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.state.body }} />
      </div>
    );
  }
}

export default PortfolioItem;