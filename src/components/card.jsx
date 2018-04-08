import React, { Component } from "react";
import { Link } from "react-router-dom";
import { portfoUrl, urlMask } from "./global";
import Grid from "material-ui/Grid";
import Card from "material-ui/Card";
import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui/Progress";
import { CSSTransitionGroup } from "react-transition-group";
import LazyLoad from "react-lazyload";
import Img from "react-image";

export const stylePaper = {
  background: "#fff",
  padding: 8,
  margin: 8,
  transition: "all 0.1s ease-in-out"
};

const styleImg = {
  width: "100%"
};

const LoadContainer = () => (
  <CSSTransitionGroup
    key="1"
    transitionName="fade"
    transitionAppear={true}
    transitionAppearTimeout={500}
    transitionEnter={false}
    transitionLeave={false}
  >
    <div
      style={{
        width: "100%",
        paddingBottom: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        background: "#f1f1f1"
      }}
    >
      <CircularProgress
        style={{
          paddingTop: "calc(50% - 20px)",
          position: "absolute"
        }}
      />
    </div>
  </CSSTransitionGroup>
);

class PortfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elevation: 2
    };
  }

  hoverOnCard = () => this.setState({ elevation: 24 });
  hoverOffCard = () => this.setState({ elevation: 2 });

  render() {
    return (
      <Grid item xs={6} md={3} lg={2}>
        <LazyLoad>
          <CSSTransitionGroup
            key="2"
            transitionName="fade"
            transitionAppear
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Card
              onMouseOver={this.hoverOnCard}
              onMouseOut={this.hoverOffCard}
              color="secondary"
              style={stylePaper}
              className="card"
              elevation={this.state.elevation}
            >
              <Link to={`/portfolio/${portfoUrl(this.props.title)}`}>
                <div>
                  <div className="thumbnail">
                    <Img
                      style={styleImg}
                      src={urlMask(this.props.field_thumbnail)}
                      // src="https://wallpaperbrowse.com/media/images/303836.jpg"
                      alt={this.props.title}
                      loader={<LoadContainer />}
                    />
                  </div>
                  <div className="title">
                    <Typography align="center" color="primary" style={{ margin: "8px 0" }}>
                      {this.props.title}
                    </Typography>
                  </div>
                </div>
              </Link>
            </Card>
          </CSSTransitionGroup>
        </LazyLoad>
      </Grid>
    );
  }
}

export default PortfoCard;
