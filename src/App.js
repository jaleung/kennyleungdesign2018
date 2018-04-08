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
import ScrollableAnchor, { configureAnchors } from "react-scrollable-anchor";
import Contact from "./components/contact";
import Favicon from "react-favicon";
// import Icon from "./components/icon.jsx"
import {Footer} from "./components/footer.jsx"

class App extends Component {
  render() {
    configureAnchors({ offset: -60, scrollDuration: 300, keepLastAnchorHash: true})
    return (
      <Router>
        <MuiThemeProvider theme={myTheme}>
          <Favicon url="//s3.kennyleung.design/favico.png" />
          <CssBaseline />
          <div className="App">
            <NavBar />
            <div className="page-wrapper">
              <ScrollableAnchor id={"home"}>
                <div className="modular-row">
                Home
                </div>
              </ScrollableAnchor>
              <ScrollableAnchor id={"about"}>
                <div className="modular-row">About</div>
              </ScrollableAnchor>
              <Route path="/" component={CardList} />
              <Route path="/logout" component={Logout} />
              <Route path="/login" component={Login} />
              <Route
                path={`/portfolio/:portfoTitle`}
                component={PortfolioItem}
              />
              <Contact />
              <Footer/>
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
