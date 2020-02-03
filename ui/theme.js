import { makeStyles } from '@material-ui/core/styles'

const 
  black2 = '#232323',
  orange1 = '#f50',
  orange3 = '#f69c55',
  orange4 = '#f69c55',
  gray2 = '#7e7f7f',
  gray3 = '#d3d3d3',
  gray5 = '#eee',
  teel3 = '#c8d6d3',
  teel2 = '#7b9d96';

const color = { 
  default: black2,
  primary: orange3,
  secondary: teel2,
  disabled: gray5, 
  link: orange1
}

const themeStyles = makeStyles( theme => ({

  '@global': {
    body: {
      // backgroundColor: '#f0f3f4' //theme.palette.common.white,
    },
  },
  typography: {
    // fontSize: 7,
    // htmlFontSize: 6
  },
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'linear-gradient(orange 25%, yellow)',
    '& h6': { color: 'black' },
  },
  appTopNav: {
    boxShadow: 'none',
    background: 'linear-gradient(to bottom, white 50%, #f9f2f4)',
    borderBottom: 'solid 1px #c8d6d3',
    postition: 'relative',
    '& label': { 
      position: 'absolute',
      left: 0,
      right: 0,
      alignItems: 'center',
      color: '#7e7f7f',
      display: 'flex',
      flexDirection: 'column',
    },
    '& button:first-child': {
      fontSize: '10',
      color: color.secondary,
      'z-index': 1101
    }
  },
  avatar: {
    margin: theme.spacing(0),
    borderColor: theme.palette.secondary.main,
    borderStyle: 'solid',
    borderWidth: 1,
    width: 60,
    height: 60,
  },
  bottomNav: {
    zIndex: 5,
    paddingBottom: theme.spacing(1),
    background: '#f5f5f5',
    borderTopColor: '#ffe4b3',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    // '& button:hover span': { 
    //  color: theme.palette.secondary.main }
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0
  },
  inbox: {},
  tabPanel: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(5),
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  partnerCall: {
    background: 'white',    
  },
  postTile: {
    background: 'white',
  },
  form: {
    marginTop: theme.spacing(3),
    width: '100%', // Fix IE 11 issue.
  },
  formControl: {
    width: '100%'
    // margin: theme.spacing(1),
    // minWidth: 220,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
}))
  
  
export default themeStyles
