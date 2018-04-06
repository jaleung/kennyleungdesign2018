import React, { Component } from "react";
import axios from "axios";
import { baseUrl } from "./global";
import PortfoCard from "./card";
import Grid from "material-ui/Grid";
import AuthBtn from "./auth";

const style = {
  marginTop: 64,
  paddingTop: 16,
  paddingLeft: '10vw',
  paddingRight: '10vw'
}

class CardList extends Component {
  state = {
    cards: [],
    isLogged: localStorage.getItem("auth"),
    loaded: false
  };

  getPortfolios() {
    let auth = localStorage.getItem("auth");
    if (auth != null) {
      axios.get(`${baseUrl}/portfolios?_format=json`, {
        headers: { Authorization: "Basic " + auth }
      }).then(resp => {
        this.setState({
          cards: resp.data,
          loaded: true
        });
      });
    } else {
      axios.get(`${baseUrl}/portfolios?_format=json`).then(resp => {
        this.setState({
          cards: resp.data,
          loaded: true
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
      <Grid container alignItems="center" style={style}>
        {this.state.cards.map(card => <PortfoCard key={card.uuid} {...card} />)}
        <AuthBtn loaded={this.state.loaded}/>
      </Grid>
    );
  }
}

export default CardList
