import React, { Component } from "react";
import "./App.css";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { baseUrl, urlMask, portfoUrl } from "./components/global.jsx";
import Login from "./components/login.jsx";
import Logout from "./components/logout.jsx";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AuthBtn from "./components/auth";
import myTheme from "./components/theme";
import CardList from "./components/cardList.jsx";
import Card from "./components/card.jsx";
// import NavBar from "./components/navBar.jsx"

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={myTheme}>
          <div className="App">
            {/* <NavBar /> */}
            <AppBar position="static" color="default">
              <Toolbar>
                <Grid container spacing={8} alignItems="center">
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={3}
                    style={{ textAlign: "left" }}
                  >
                    <Typography variant="title" color="inherit">
                      <Link to="/">Kenny Leung | UX Developer</Link>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={9}
                    style={{ textAlign: "right" }}
                  >
                    <Link to="/login">
                      <Button>Login</Button>
                    </Link>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            <AuthBtn />
            <Route path="/" component={CardList} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={Login} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
