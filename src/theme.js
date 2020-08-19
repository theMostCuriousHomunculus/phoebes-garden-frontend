import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import pink from '@material-ui/core/colors/pink';

const { defaultTheme } = createMuiTheme();

const primary = yellow[400];
const secondary = pink[100];

const theme = createMuiTheme({
  ...defaultTheme,
  overrides: {
    MuiCard: {
      root: {
        margin: 8
      }
    },
    MuiCardActions: {
      root: {
        backgroundColor: primary,
        padding: '4px 8px 8px 8px'
      }
    },
    MuiCardContent: {
      root: {
        padding: '4px 8px 4px 8px'
      }
    },
    MuiCardHeader: {
      root: {
        backgroundColor: primary,
        padding: '8px 8px 4px 8px'
      }
    },
    MuiTypography: {
      h1: {
        fontSize: '6rem'
      },
      h2: {
        fontSize: '3.75rem'
      },
      h3: {
        fontSize: '3rem'
      },
      h4: {
        fontSize: '2.4rem'
      },
      h5: {
        fontSize: '2rem'
      },
      body1: {
        fontSize: '1.6rem'
      },
      body2: {
        fontSize: '1.2rem'
      },
      button: {
        fontSize: '1.6rem'
      }
    }    
  },
  palette: {
    primary: {
      main: primary
    },
    secondary: {
      main: secondary
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
    htmlFontSize: 10
  }
})

export default theme;