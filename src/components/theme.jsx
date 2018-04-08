import { createMuiTheme } from "material-ui/styles";

const myTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#444444"
    },
    secondary: {
      main: "#ffffff"
    },
    background: "#444444",
    footer: "#9e9e9e"
  }
});

export default myTheme;
