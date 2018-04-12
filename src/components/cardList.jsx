import React, { Component } from "react";
import axios from "axios";
import { baseUrl } from "./global";
import PortfoCard from "./card";
import Grid from "material-ui/Grid";
import AuthBtn from "./auth";
import ScrollableAnchor from "react-scrollable-anchor";
import Typography from "material-ui/Typography";

class CardList extends Component {
  state = {
    cards: [],
    isLogged: localStorage.getItem("auth"),
    loaded: false
  };

  getPortfolios() {
    let auth = localStorage.getItem("auth");
    if (auth != null) {
      axios
        .get(`${baseUrl}/portfolios?_format=json`, {
          headers: { Authorization: "Basic " + auth }
        })
        .then(resp => {
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
      <ScrollableAnchor id={"portfolio"}>
        <div className="modular-row portfolio">
          <Typography variant="headline" gutterBottom>
            Portfolio
          </Typography>
          <Grid container alignItems="center">
            <AuthBtn loaded={this.state.loaded} />
            {this.state.cards.map(card => (
              <PortfoCard key={card.uuid} {...card} />
            ))}
          </Grid>
        </div>
      </ScrollableAnchor>
    );
  }
}

export default CardList;
