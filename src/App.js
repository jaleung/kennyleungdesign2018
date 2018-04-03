import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login.jsx";
import Logout from "./components/logout.jsx";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AuthBtn from "./components/auth";
import myTheme from "./components/theme";
import CardList from "./components/cardList.jsx";
import PortfolioItem from "./components/portfolioItem.jsx";
import NavBar from "./components/navBar.jsx";

class App extends Component {
  render() {
    return (
        <Router>
          <MuiThemeProvider theme={myTheme}>
            <div className="App">
              <NavBar />
              <AuthBtn />
              <Route path="/" component={CardList} />
              <Route path="/logout" component={Logout} />
              <Route path="/login" component={Login} />
              <Route
                path={`/portfolio/:portfoTitle`}
                component={PortfolioItem}
              />
            </div>
          </MuiThemeProvider>
        </Router>
    );
  }
}

export default App;
