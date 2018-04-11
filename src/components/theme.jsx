import { createMuiTheme } from "material-ui/styles";
import blue from "material-ui/colors/blue"

const myTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#444444"
    },
    secondary: {
      main: "#ffffff"
    },
    link: {
      main: blue[500]
    }
  },
  typography: {
    fontFamily: "'Fira Sans', sans-serif",
    fontSize: 16
  }
});

export default myTheme;
