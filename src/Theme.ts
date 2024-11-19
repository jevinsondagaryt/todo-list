import { createTheme } from "@mui/material";
import { green, purple, red } from "@mui/material/colors";

export const Theme = createTheme({

  palette: {
    primary: {
      main: green[600],
      dark: green[700],
      light: red[100],
      contrastText: '#fff',
    },
    secondary: {
      main: purple[300],
      dark: purple[400],
      light: purple[100],
      contrastText: '#fff',
    },
    
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          padding: '10px 30px',
          borderRadius: '10px',
          fontWeight: 'bold',
          ":hover": {
            boxShadow: '0px 3px 10px 0px black'
          }
        },
      }
    }
  }
})