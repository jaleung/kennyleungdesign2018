import React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import { Link } from "react-router-dom";
import {capitalize} from "./global";

const navItems = ['home', 'about', 'portfolio', 'contact']

const NavBar = () => {
    return (
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Grid container spacing={0} alignItems="center">
              <Grid item xs={12} md={4} xl={3} style={{ textAlign: "left" }}>
                <Typography variant="title" color="inherit">
                  <Link to="/" className="padding-top-half padding-bottom-half dib">Kenny Leung | UX Developer</Link>
                </Typography>
              </Grid>
              <Grid item xs={12} md={8} xl={9} style={{ textAlign: "right" }}>
                  {navItems.map(navItem => (
                    <Button key={navItem} href={'#' + navItem}>{ capitalize(navItem) }</Button>
                  ))}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
    );
}

export default NavBar;
