import { Link } from "react-router-dom";
import React, { Component } from "react";
import Grid from "material-ui/Grid";
import Card from "material-ui/Card";
import { stylePaper } from "./card";
import Typography from "material-ui/Typography";
import { CSSTransitionGroup } from "react-transition-group";
import Icon from "./icon";
import blue from "material-ui/colors/blue";
import { MD } from "./global";

class AuthBtn extends Component {
  state = {
    elevation: 2
  };

  hoverOnCard = () => this.setState({ elevation: 24 });
  hoverOffCard = () => this.setState({ elevation: 2 });

  componentWillReceiveProps() {
    this.forceUpdate();
  }
  render() {
    var loggedIn = localStorage.getItem("auth");
    var dataLoaded = this.props.loaded;
    if (!dataLoaded) {
      return "";
    } else {
      return (
        <Grid item xs={6} md={3} lg={2}>
          <CSSTransitionGroup
            key="2"
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Card
              onMouseOver={this.hoverOnCard}
              onMouseOut={this.hoverOffCard}
              style={stylePaper}
              color="secondary"
              elevation={this.state.elevation}
              className="card"
            >
              <Link to={loggedIn ? "/logout" : "/login"}>
                <div>
                  <div className="loginThumbnail">
                    <div className="inner">
                      <Icon
                        name={loggedIn ? "logout-1" : "lock"}
                        size="5"
                        style={{ color: blue[400] }}
                      />
                    </div>
                  </div>
                  <MD>
                    <div className="title">
                      <Typography
                        align="center"
                        color="primary"
                        style={{ padding: "8px 0" }}
                      >
                        {loggedIn ? "Bye!" : "Even Cooler Stuffs"}
                      </Typography>
                    </div>
                  </MD>
                </div>
              </Link>
            </Card>
          </CSSTransitionGroup>
        </Grid>
      );
    }
  }
}

export default AuthBtn;
