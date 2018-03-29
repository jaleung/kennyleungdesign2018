import React, { Component } from "react";
import "./App.css";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { baseUrl, urlMask, portfoUrl } from "./components/global.jsx";
import Login from "./components/login.jsx";
import Logout from "./components/logout.jsx";

class CardList extends Component {
  state = {
    cards: [],
    isLogged: localStorage.getItem("auth")
  };
  getPortfolios() {
    let auth = localStorage.getItem("auth");
    if (auth != null) {
    Axios.get(`${baseUrl}/portfolios?_format=json`, {
      headers: { Authorization: "Basic " + auth }
    }).then(resp => {
      this.setState({
        cards: resp.data
      });
    });
    } else {
    Axios.get(`${baseUrl}/portfolios?_format=json`).then(resp => {
      this.setState({
        cards: resp.data
      });
    });
    }
  }

  componentDidMount() {
    this.getPortfolios();
  }

  componentWillReceiveProps(nextProps) {
    if (localStorage.getItem !== this.state.isLogged) {
    this.forceUpdate(this.getPortfolios);
    }
  }

  render() {
  return (
    <div>{this.state.cards.map(card => <Card key={card.uuid} {...card} />)}</div>
  );
  }
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
    let auth = localStorage.getItem("auth");
    let currentPortfo = this.props.match.params.portfoTitle;
    if (auth != null) {
      Axios.get(`${baseUrl}/portfolio/${currentPortfo}?_format=json`, {
        headers: { Authorization: "Basic " + auth }
      }).then(
        resp => {
          console.log(resp)
          this.setState({
            title: resp.data[0].title,
            body: resp.data[0].body
          });
        }
      );
    } else {
      Axios.get(`${baseUrl}/portfolio/${currentPortfo}?_format=json`,).then(
        resp => {
          console.log(resp)
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
class App extends Component {


  renderUserLink() {
    var loggedIn = localStorage.getItem("auth");
    if (loggedIn) {
      return (
        <Link to="/logout">Logout</Link>
      )
    } else {
      return (
        <Link to="/login">Login</Link>
      )
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="login_card">
            {this.renderUserLink()}
          </div>
          <Route path="/" component={CardList} />
          <Route path={`/portfolio/:portfoTitle`} component={PortfolioItem} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
