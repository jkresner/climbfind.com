import { makeStyles } from '@material-ui/core/styles';
const themeStyles = makeStyles( theme => ({


'@global': {
  body: {
    backgroundColor: '#f0f3f4' //theme.palette.common.white,
  },
},
root: {
  flexGrow: 1,
},
appBar: {
  background: 'linear-gradient(orange 25%, yellow)',
  '& h6': { color: "black" },
},
appTopNav: {
  alignItems: 'center',
  background: 'linear-gradient(to bottom, white 25%, #fffdfa)',
  borderBottom: 'solid 1px #f9f2f4',
  '& label': { 
    color: '#7e7f7f',
    display: 'flex',
    flexDirection: 'column',
  }
},
avatar: {
  margin: theme.spacing(1),
  borderColor: theme.palette.secondary.main,
  borderStyle: "solid",
  borderWidth: 1,
  width: 60,
  height: 60,
},
bottomAction: {

},
bottomNav: {
  zIndex: 5,
  paddingBottom: theme.spacing(1),
  background: "#f5f5f5",
  borderTopColor: "#ffe4b3",
  borderTopStyle: "solid",
  borderTopWidth: 1,
  // '& button span': { 
  //   color: 'black'
  // },
  // '& button:hover span': { 
    // color: theme.palette.secondary.main 
  // },
},
footer: {
  position: "fixed",
  backgroundColor: "black",
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
postTile: {
  background: "white",
},
form: {
  marginTop: theme.spacing(3),
  width: '100%', // Fix IE 11 issue.
},
formControl: {
  margin: theme.spacing(1),
  minWidth: 220,
},
submit: {
  margin: theme.spacing(3, 0, 2),
},

}))


export default themeStyles
