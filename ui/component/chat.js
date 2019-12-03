import marked from 'marked'
import moment from 'moment'
import React, { useState } from 'react'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import themeStyles from '../theme'
import { TextareaAutosize } from '@material-ui/core'


var MaxHeightTextarea = (props) => (
  <TextareaAutosize
    {...props}
    variant="outlined"
    required   
    autoFocus
    rowsMax={4}
  />)


var TimeAgo = ({ago}) => (<time>{moment(ago).fromNow()}</time> )


var Message = ({id,me,time,text,name,avatar,css}) => (
  <ListItem divider
    key={id} 
    alignItems="flex-start"
    className={me ? 'me' : ''}
  >
    <TimeAgo ago={time} />
    <Avatar alt={name} src={avatar} className={css.avatar}  />
    <div dangerouslySetInnerHTML={({__html:marked(text)})}/>
  </ListItem>)


export function Thread({data}) {
  if (!data) return ('')

  const css = themeStyles()
  const messages = data.history

  const items = messages.map((m) => (<Message 
    css={css}
    key={m._id}
    text={m.text}
    name={m.user.name}
    avatar={m.user.avatar} 
    time={m.time} />)
  )

  return <React.Fragment>
    <List id="chat">{items}</List>
    <form className={css.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <MaxHeightTextarea id="message" name="message" autoComplete="msg" placeholder="Type message ..." />
        </Grid>  
        <Grid item xs={1}>
          <IconButton variant="contained" type="submit" color="primary" aria-label="send"><EmailOutlinedIcon /></IconButton>
        </Grid>  
      </Grid>  
    </form>
  </React.Fragment>
}


function Chat(props) {
  let {c,css} = props
  let __html = marked(c.last.text)
  let msg = { __html }

  return (<ListItem 
    divider
    alignItems="flex-start"
    key={c._id} 
    onClick={() => props.openChat(c)}
    className={c.unread ? 'unread' : ''}
  >
    <ListItemAvatar>
      <Avatar alt={c.title} src={c.avatar} className={css.avatar}  />
    </ListItemAvatar>
    <ListItemText 
      primary={c.title}
      secondary={
        <React.Fragment>            
          <TimeAgo ago={c.last.time} />             
        </React.Fragment>
      }
    />    
    <div dangerouslySetInnerHTML={msg} />  
    <MarkunreadMailboxIcon color="action" fontSize="large" />
  </ListItem>)
}

/*
*/

/* chats: 
    _id
    unread
    title
    with [
      _id
      name
      avatar
    ]
    last
*/
export function Inbox(props) {
  if (props.hidden) return null    
  if (!props.data) return null    

  const css = themeStyles()
  let [chats] = useState(props.data.chats) // , setChats
  if (!chats.length) return (<div><br/><p>No messages yet</p></div>)

  let items = chats.map((c, idx) => 
    (<Chat key={c._id} c={c} openChat={props.openChat} css={css} />))

  return (
    <List className={css.inbox}>
      {items}
    </List>)
}
