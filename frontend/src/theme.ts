
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#ffb7c5',
    },
    secondary: {
      main: '#19857b',
    }
  },
  components: {
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: "10px",
            }
        }
    }
  }
});

export default theme;