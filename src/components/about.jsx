import React from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import ScrollableAnchor from "react-scrollable-anchor";
import Grid from "material-ui/Grid";
import blue from "material-ui/colors/blue"
import Scroller from "./scrollToPage";

const style = {
  bigHead: {
    fontSize: "2.5em"
  },
  intro: {
    fontSize: "1.5em"
  },
  link: {
    color: blue[200]
  }
};

const bio = {
  firm: {
    name: "8 Securities",
    homepage: "//8securities.com/"
  }
};

const About = props => {
  return (
    <ScrollableAnchor id={"about"}>
      <div className="modular-row about">
        <Grid container>
          <Grid item lg={7} xs={12}>
            <Typography
              variant="headline"
              gutterBottom
              className={props.classes.bigHead}
            >
              <em>Hi, this is Kenny Leung</em>
            </Typography>
            <Typography variant="subheading" className={props.classes.intro}>
              I am a UI/UX developer based in Hong Kong. I work at{" "}
              <a target="_blank" href={bio.firm.homepage} className={props.classes.link}>
                {bio.firm.name}
              </a>{" "}
              where I craft user experience and get my hands dirty with code.
            </Typography>
          </Grid>
        </Grid>
        <Scroller to="portfolio"/>
      </div>
    </ScrollableAnchor>
  );
};

export default withStyles(style)(About);
