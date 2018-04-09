import React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import { Link } from "react-router-dom";
import { capitalize, SM, MD } from "./global";
import Tabs, { Tab } from "material-ui/Tabs";
import HomeIcon from "@material-ui/icons/Home";
import FaceIcon from "@material-ui/icons/Face";
import WorkIcon from "@material-ui/icons/Work";
import ChatIcon from "@material-ui/icons/ChatBubble";

const navItems = [
  { name: "home", icon: <HomeIcon /> },
  { name: "about", icon: <FaceIcon /> },
  { name: "portfolio", icon: <WorkIcon/>},
  { name: "contact", icon: <ChatIcon/>}
];

const NavBar = () => {
  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <Grid container spacing={0} alignItems="center">
          <Grid item xs={12} md={4} xl={3} style={{ textAlign: "left" }}>
            <Typography variant="title" color="inherit">
              <Link to="/" className="padding-top-half padding-bottom-half dib">
                Kenny Leung | UX Developer
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={8} xl={9} style={{ textAlign: "right" }}>
            <MD>
              {navItems.map(navItem => (
                <Button key={navItem.name} href={"#" + navItem.name}>
                  {capitalize(navItem.name)}
                </Button>
              ))}
            </MD>

            <SM />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
