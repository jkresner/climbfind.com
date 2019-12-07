import React, { useState }  from 'react'
import ReactDOM from 'react-dom'

import { AppBar, Box, BottomNavigation, BottomNavigationAction, Container, 
  IconButton, Slide, Paper, Toolbar, Typography } from '@material-ui/core'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ListAltIcon from '@material-ui/icons/ListAlt'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import AddCommentIcon from '@material-ui/icons/AddComment'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import FavoriteIcon from '@material-ui/icons/Favorite'

import './cf.css'
import themeStyles from './theme'
import Like from './component/like'
import {PostList,PostForm} from './component/post'
import {Inbox,Thread} from './component/chat'


function Post({css,data,onBack,user}) {
  if (!data) return null

  return (<React.Fragment>
    <AppBar className={css.appTopNav}>
      <Toolbar>
        <IconButton onClick={onBack} aria-label="back" size="small">
          Cancel
        </IconButton>
        <label>Partner Call</label>
      </Toolbar>
    </AppBar>
    <PostForm data={data} css={css} user={user} />
  </React.Fragment>)
}


function Feed(props) {
  if (!props.data) return null
  return (<PostList data={props.data} />)
}


function Messages({data,chat,setChat,css}) {
  if (!data) return null
  
  let onBack = () => setChat(null)
  let openChat = val => { 
    let {title} = val
    fetch(`/api/chats/read/${val._id}`)
      .then(res => res.json())
      .then(r => {
        let dat = Object.assign({title},r)
        setChat(dat)
      })
      .catch(console.log) 
  }

  let topNav = ''
  if (chat) topNav = (<AppBar className={css.appTopNav}>
    <Toolbar>
      <IconButton onClick={onBack} aria-label="back">
        <ArrowBackIcon /> 
      </IconButton>
      <label>{chat.title}</label>
    </Toolbar>
  </AppBar>)

  return (<React.Fragment>
    {topNav}
    <Inbox data={data} openChat={openChat} hidden={!!chat} />
    <Thread data={chat} />
  </React.Fragment>)
}



function TabPanel({ children, id, show, ...other }) { 
  return !show ? null : (<Typography
    component="div"
    role="tabpanel"
    hidden={!show}
    id={`tabpanel-${id}`}
    aria-labelledby={`tab-${id}`}>
    <Box p={3}>{children}</Box>
  </Typography>) 
}


function HideOnScroll({children,hidden}) {
  if (hidden) return null
  const trigger = useScrollTrigger()

  return (<Slide 
    appear={false} 
    direction="down" 
    in={!trigger}>{children}
  </Slide>)
}


function App(props) {
  const css = themeStyles()
  let pages = ['PARTNERS','MESSAGES','POST','LIKE','SETTINGS']

  let [me,setMe] = useState(null),
    [page,setPage] = useState(2),
    [feed,setFeed] = useState(null),
    [inbox,setInbox] = useState(null),
    [chat,setChat] = useState(null),
    [post,setPost] = useState(null),
    [settings,setSettings] = useState(null)

  let handleTab = (e, val) => setPage(val)  

  setTimeout(function() {
    if (window.__INITIAL__DATA__) {
      let {places,session,posts,chats,settings} = window.__INITIAL__DATA__
      delete window.__INITIAL__DATA__    
      // console.log('data.places', data.places)
      if (session) { setMe(session) }
      if (posts) { setPage(0); setFeed({posts,places}) }
      if (chats) { setPage(1); setInbox({chats}) }
      if (places) { setPost({places}) }
      if (settings) { setPage(4); setSettings({settings,places}) }
    }
  }, 50) 

  function fullMode() { return page===2||!!chat }

  return (<React.Fragment>
    <HideOnScroll {...props} hidden={fullMode()}>
      <AppBar className={css.appBar}>
        <Toolbar>
          <Typography variant="h6">{pages[page]}</Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
    <Container className={css.tabPanel}>
      <TabPanel show={page===0} id="feed">
        <Feed css={css} data={feed} />
      </TabPanel>
      <TabPanel show={page===1} id="message">
        <Messages css={css} data={inbox} chat={chat} setChat={setChat} />
      </TabPanel>
      <TabPanel show={page===2} id="post">
        <Post css={css} data={post} user={me} onBack={ e => handleTab(e, 0) } />
      </TabPanel>
      <TabPanel show={page===3} id="like">
        <Like css={css} />
      </TabPanel>      
      <TabPanel show={page===4} id="profile">
        Profile
      </TabPanel>
    </Container>
    <Paper square className={css.footer} hidden={fullMode()}>
      <BottomNavigation
        className={css.bottomNav}
        value={page}
        onChange={handleTab}
      >
        <BottomNavigationAction label="Partners" icon={<ListAltIcon fontSize='large' />} />
        <BottomNavigationAction label="Messages" icon={<EmailOutlinedIcon fontSize='large' />} />
        <BottomNavigationAction label="Post" icon={<AddCommentIcon fontSize='large' />} />
        <BottomNavigationAction label="Like" icon={<FavoriteIcon fontSize='large' />} />
        <BottomNavigationAction label="Account" icon={<PersonAddIcon fontSize='large' />} />
      </BottomNavigation>
    </Paper>
  </React.Fragment>)
}


export default App


ReactDOM.render(<App />, document.getElementById('root'))
