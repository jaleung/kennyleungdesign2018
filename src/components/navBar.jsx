import React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Grid container spacing={8} alignItems="center">
              <Grid item xs={12} sm={4} xl={3} style={{ textAlign: "left" }}>
                <Typography variant="title" color="inherit">
                  <Link to="/">Kenny Leung | UX Developer</Link>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8} xl={9} style={{ textAlign: "right" }}>
                <Link to="/">
                  <Button>Lorem</Button>
                </Link>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
    );
}

export default NavBar;
