import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login.jsx";
import Logout from "./components/logout.jsx";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import myTheme from "./components/theme";
import CardList from "./components/cardList.jsx";
import PortfolioItem from "./components/portfolioItem.jsx";
import NavBar from "./components/navBar.jsx";
import CssBaseline from "material-ui/CssBaseline";
import { configureAnchors } from "react-scrollable-anchor";
import Contact from "./components/contact";
import Favicon from "react-favicon";
// import Icon from "./components/icon.jsx"
import { Footer } from "./components/footer.jsx";
import About from "./components/about.jsx";
import { Home } from "./components/home.jsx";
import TypeIt from 'typeit';

class App extends Component {
  componentDidMount() {
    document.title = "Kenny Leung | UX Developer";
    const typeit = new TypeIt('.type-it', {
      speed: 10,
      lifeLike: true
    });
  }

  render() {
    console.log(myTheme);
    configureAnchors({ offset: -60, scrollDuration: 300 });
    return (
      <Router>
        <MuiThemeProvider theme={myTheme}>
          <Favicon url="//s3.kennyleung.design/favico.png" />
          <CssBaseline />
          <div
            className="App"
            style={{ backgroundColor: myTheme.palette.primary.main }}
          >
            <NavBar />
            <div className="page-wrapper">
              <Home />
              <About />
              <Route path="/" component={CardList} />
              <Route path="/logout" component={Logout} />
              <Route path="/login" component={Login} />
              <Route
                path={`/portfolio/:portfoTitle`}
                component={PortfolioItem}
              />
              <Contact />
              <Footer />
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
