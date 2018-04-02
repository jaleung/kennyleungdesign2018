import React, { Component } from "react";
import axios from "axios";
import { baseUrl } from "./global";
import Card from "./card";


class CardList extends Component {
  state = {
    cards: [],
    isLogged: localStorage.getItem("auth")
  };

  getPortfolios() {
    let auth = localStorage.getItem("auth");
    if (auth != null) {
      axios.get(`${baseUrl}/portfolios?_format=json`, {
        headers: { Authorization: "Basic " + auth }
      }).then(resp => {
        this.setState({
          cards: resp.data
        });
      });
    } else {
      axios.get(`${baseUrl}/portfolios?_format=json`).then(resp => {
        this.setState({
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
