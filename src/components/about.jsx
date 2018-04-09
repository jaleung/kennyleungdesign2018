import React from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import ScrollableAnchor from "react-scrollable-anchor";
import Grid from "material-ui/Grid";
import blue from "material-ui/colors/blue";
import Scroller from "./scrollToPage";
import { SM } from "./global";

const style = {
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
  let h1Variant;
  return (
    <ScrollableAnchor id={"about"}>
      <div className="modular-row about">
        <Grid container>
          <Grid item lg={7} xs={12}>
            <SM>
              {matches => {
                if (matches) {
                  h1Variant = "display1";
                } else {
                  h1Variant = "display3";
                }

                return (
                  <Typography
                    variant={h1Variant}
                    gutterBottom
                    color="secondary"
                  >
                    <em>Hi, this is Kenny Leung</em>
                  </Typography>
                );
              }}
            </SM>
            <Typography variant="subheading" className={props.classes.intro}>
              I am a UI/UX developer based in Hong Kong. I work at{" "}
              <a
                target="_blank"
                href={bio.firm.homepage}
                className={props.classes.link}
              >
                {bio.firm.name}
              </a>{" "}
              where I craft user experience and get my hands dirty with code.
            </Typography>
          </Grid>
        </Grid>
        <Scroller to="portfolio" />
      </div>
    </ScrollableAnchor>
  );
};

export default withStyles(style)(About);
