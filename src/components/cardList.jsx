import React, { Component } from "react";
import axios from "axios";
import { baseUrl } from "./global";
import PortfoCard from "./card";
import Grid from "material-ui/Grid";

const style = {
  marginTop: 64,
  paddingTop: 16,
  paddingLeft: '10vw',
  paddingRight: '10vw'
}

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
      <Grid container spacing={16} alignItems="center" style={style}>
        {this.state.cards.map(card => <PortfoCard key={card.uuid} {...card} />)}
      </Grid>
    );
  }
}

export default CardList
