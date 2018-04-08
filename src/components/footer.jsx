import React from "react";
import Icon from "./icon";
import myTheme from "./theme";
import { capitalize } from "./global";
import Button from "material-ui/Button"

const socials = [
  { name: "twitter", url: "//twitter.com/jaleung" },
  { name: "linkedin", url: "//hk.linkedin.com/in/kennyleungdesign" },
  { name: "behance", url: "//behance.net/jaleung326" },
  { name: "telegram", url: "//t.me/jaleung" }
];

export const Footer = () => {
  let linkColor = myTheme.palette.grey[300];
  let currentYear = new Date().getFullYear();
  return (
    <footer style={{ color: linkColor }} className="text-center">
      <div className="margin-bottom">
        <Button href="#home">
        <Icon name="down-open" size="1.4" rotate/>
        </Button>
      </div>
      <div className="padding">
        {socials.map(social => (
          <a
            key={social.name}
            title={capitalize(social.name)}
            href={social.url}
            target="_blank"
            className="padding-left padding-right"
            style={{ color: linkColor }}
          >
            <Icon name={social.name} size="1.2" />
          </a>
        ))}
      </div>
      <div className="padding-bottom margin-bottom">
        <small>© Copyright {currentYear} Kenny Leung. All rights reserved.</small>
      </div>
    </footer>
  );
};
