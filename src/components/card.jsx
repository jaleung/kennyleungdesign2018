import React, { Component } from "react";
import { Link } from "react-router-dom";
import { portfoUrl, urlMask } from "./global";
import Grid from "material-ui/Grid";
import Card from "material-ui/Card";
import Typography from "material-ui/Typography";

const stylePaper = {
  background: "#fff",
  padding: 8,
  transition: "all 0.3s ease-in-out"
};

const styleImg = {
  width: "100%"
};

class PortfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elevation: 2
    };
  }

  hoverOn = () => this.setState({ elevation: 24 });
  hoverOff = () => this.setState({ elevation: 2 });

  render() {
    return (
      <Grid item xs={12} sm={6} md={3}>
        <Card
          onMouseOver={this.hoverOn}
          onMouseOut={this.hoverOff}
          color="secondary"
          style={stylePaper}
          elevation={this.state.elevation}
        >
          <Link to={`/portfolio/${portfoUrl(this.props.title)}`}>
            <div>
              <div className="thumbnail">
                <img
                  style={styleImg}
                  src={urlMask(this.props.field_thumbnail)}
                  alt={this.props.title}
                />
              </div>
              <div className="title">
                <Typography color="primary" style={{ margin: "8px 0" }}>
                  {this.props.title}
                </Typography>
              </div>
            </div>
          </Link>
        </Card>
      </Grid>
    );
  }
}

export default PortfoCard;
