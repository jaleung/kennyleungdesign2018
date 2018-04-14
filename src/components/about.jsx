import React from "react";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import ScrollableAnchor from "react-scrollable-anchor";
import Grid from "material-ui/Grid";
import blue from "material-ui/colors/blue";
import Scroller from "./scrollToPage";
import { SM } from "./global";

const style = {
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
  let descVariant;
  return (
    <ScrollableAnchor id={"about"}>
      <div className="modular-row about">
        <Grid container>
          <Grid item lg={7} xs={12}>
            <SM>
              {matches => {
                if (matches) {
                  h1Variant = "headline";
                  descVariant = "title";
                } else {
                  h1Variant = "display2";
                  descVariant = "headline";
                }
                return (
                  <div>
                  <Typography
                    variant={h1Variant}
                    gutterBottom
                    color="secondary"
                  >
                    <em>Hi, this is Kenny Leung</em>
                  </Typography>

            <Typography variant={descVariant}>
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
                  </div>
                );
              }}
            </SM>
          </Grid>
        </Grid>
        <Scroller to="portfolio" />
      </div>
    </ScrollableAnchor>
  );
};

export default withStyles(style)(About);
