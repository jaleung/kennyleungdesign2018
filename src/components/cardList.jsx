import React, { Component } from "react";
import axios from "axios";
import { baseUrl } from "./global";
import Card from "./card";

class CardList extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      isLogged: localStorage.getItem("auth")
    };
  // this.getPortfolios = this.getPortfolios.bind(this);
  }

  getPortfolios() {
    let auth = localStorage.getItem("auth");
    var _this = this;
    _this.setState({
      cards: []
    })
    if (auth != null) {
      this.serverRequest  = axios.get(`${baseUrl}/portfolios?_format=json`, {
        headers: { Authorization: "Basic " + auth }
      }).then(resp => {
        _this.setState({
          cards: resp.data
        });
      });
    } else {
      this.serverRequest = axios.get(`${baseUrl}/portfolios?_format=json`).then(resp => {
        _this.setState({
          cards: resp.data
        });
      });
    }
  }

  componentDidMount() {
    this.getPortfolios();
  }

  componentWillReceiveProps() {
    if (localStorage.getItem !== this.state.isLogged) {
      this.forceUpdate(this.getPortfolios);
    }
  }

  render() {
    return (
      <div>
        {this.state.cards.map(card => <Card key={card.uuid} {...card} />)}
      </div>
    );
  }
}
export default CardList

