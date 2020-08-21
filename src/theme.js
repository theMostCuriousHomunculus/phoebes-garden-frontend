import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';

const { defaultTheme } = createMuiTheme();
const breakpoints = createBreakpoints({})

const primary = yellow[400];
const secondary = green[500];

const theme = createMuiTheme({
  ...defaultTheme,
  overrides: {
    MuiButton: {
      label: {
        color: '#ffffff'
      }
    },
    MuiCard: {
      root: {
        margin: 8
      }
    },
    MuiCardActions: {
      root: {
        backgroundColor: primary,
        padding: 8
      }
    },
    MuiCardContent: {
      root: {
        padding: 8
      }
    },
    MuiCardHeader: {
      root: {
        backgroundColor: primary,
        padding: 8
      }
    },
    MuiTypography: {
      h1: {
        [breakpoints.down('sm')]: {
          fontSize: '2.4rem'
        },
        [breakpoints.up('md')]: {
          fontSize: '4rem'
        }
      },
      h2: {
        [breakpoints.down('sm')]: {
          fontSize: '2.1rem'
        },
        [breakpoints.up('md')]: {
          fontSize: '3.5rem'
        }
      },
      h3: {
        [breakpoints.down('sm')]: {
          fontSize: '1.9rem'
        },
        [breakpoints.up('md')]: {
          fontSize: '3rem'
        }
      },
      h4: {
        [breakpoints.down('sm')]: {
          fontSize: '1.75rem'
        },
        [breakpoints.up('md')]: {
          fontSize: '2.5rem'
        }
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
    ].join(',')
  }
})

export default theme;