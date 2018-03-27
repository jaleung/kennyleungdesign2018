import React, { Component } from "react";
import "./App.css";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const globalUrl = "https://35.189.186.209/";

const urlMask = url => {
  return url.replace("storage.googleapis.com/", "");
};

const portfoUrl = url => {
  return url.toLowerCase().replace(/ /g, "-");
};

const CardList = props => {
  return (
    <div>{props.cards.map(card => <Card key={card.uuid} {...card} />)}</div>
  );
};

const Card = props => {
  return (
    <div className="card">
      <Link to={`/portfolio/${portfoUrl(props.title)}`}>
        <div className="thumbnail">
          <img
            width="100px"
            src={urlMask(props.field_thumbnail)}
            alt={props.title}
          />
        </div>
        <div className="title">{props.title}</div>
      </Link>
    </div>
  );
};

class PortfolioItem extends Component {
  state = {};

  getPortfolio() {
    this.setState({});
    let currentPortfo = this.props.match.params.portfoTitle;
    Axios.get(`${globalUrl}/portfolio/${currentPortfo}?_format=json`).then(
      resp => {
        this.setState({
          title: resp.data[0].title,
          body: resp.data[0].body
        });
      }
    );
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
class App extends Component {
  state = {
    cards: []
  };
  componentDidMount() {
    Axios.get(`${globalUrl}/portfolios?_format=json`).then(resp => {
      this.setState(prevState => ({
        cards: prevState.cards.concat(resp.data)
      }));
    });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <CardList cards={this.state.cards} />
          <Route path={`/portfolio/:portfoTitle`} component={PortfolioItem} />
        </div>
      </Router>
    );
  }
}

export default App;
