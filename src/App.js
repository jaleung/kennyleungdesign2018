import React, { Component } from "react";
import "./App.css";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { baseUrl, urlMask, portfoUrl } from "./components/global.jsx";
import Login from "./components/login.jsx";
import Logout from "./components/logout.jsx";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import AuthBtn from "./components/auth";
import myTheme from "./components/theme";
import Grid from "material-ui/Grid";
import Button from 'material-ui/Button';


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

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={myTheme}>
          <div className="App">
            <AppBar position="static" color="default">
              <Toolbar>
                <Grid container spacing={8} alignItems="center">
                  <Grid item xs={12} sm={4} md={3} style={{textAlign: 'left'}}>
                    <Typography variant="title" color="inherit">
                      <Link to="/">Kenny Leung | UX Developer</Link>
                    </Typography>{" "}
                  </Grid>
                  <Grid item xs={12} sm={8} md={9} style={{textAlign: 'right'}}>
                      <Button>
                        <Link to="/login">Login</Link>
                      </Button>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            <AuthBtn />
            <Route path="/" component={CardList} />
            <Route path={`/portfolio/:portfoTitle`} component={PortfolioItem} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={Login} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
