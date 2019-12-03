import React, { useState } from 'react'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import themeStyles from '../theme'
import { MaxHeightTextarea } from './input'
import { Avatar, Grid, List, ListItem, InputLabel, FormControl, Container, 
  CssBaseline, MenuItem, Select } from '@material-ui/core'


function SelectCity(props) {
  let css = props.css
  let places = props.places
  let cities = Object.keys(places.area)
    .filter(id => props.places.area[id].linked.length > 0)
    .map(id => <MenuItem key={id} value={id}>{props.places.area[id].name}</MenuItem>)

  return <FormControl variant="outlined" className={css.formControl}>
    <InputLabel id="city-select-label"></InputLabel>
    <Select id="city" name="city"
      displayEmpty
      value={props.value}
      labelId="city-select-label"                    
      onChange={props.handleCity}
    >
      <MenuItem key='select_city' value=""><em>-- select city --</em></MenuItem>
      {cities}
    </Select>            
  </FormControl>
}


function SelectPlace(props) {
  if (!props.city) return null
  let css = props.css
  let city = props.city
  let places = props.places.area[city].linked
    .map(p =><MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>)     

  return <FormControl variant="outlined" className={css.formControl}>
    <InputLabel id="place-select-label"></InputLabel>
    <Select id="place" name="place"
      autoWidth
      displayEmpty
      value={props.value}
      labelId="place-select-label"                    
      onChange={props.handlePlace}
    >
      <MenuItem key='select_place' value="">-- select climbing gym --</MenuItem>
      {places}
    </Select>
  </FormControl>
}


export function PostForm(props) {
  if (!props.data) return null

  let {css,user} = props
  let [city,setCity] = useState('')
  let [place,setPlace] = useState('')
  // let [climbing,setClimbing] = useState(null)
  // let [day,setDay] = useState(null)
  // let [message,setMessage] = useState(null)

  let handleCity = e => {
    setCity(e.target.value)
    if (place != '') setPlace('')   
  }

  let handlePlace = e => {
    setPlace(e.target.value)
  }

  // fetch(`/api/chats/read/${val._id}`)
  //     .then(res => res.json())
  //     .then(r => {
  //       let dat = Object.assign({title},r)
  //       setChat(dat)
  //     })
  //     .catch(console.log) 

  return <Container component="main" maxWidth="xs" id="sup">
    <CssBaseline />
    <div className={css.paper}>
      <form className={css.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SelectCity css={css} value={city} handleCity={handleCity} places={props.data.places} />
          </Grid>
          <Grid item xs={12}>
            <SelectPlace css={css} value={place} city={city} handlePlace={handlePlace} places={props.data.places} />
          </Grid>
          <Grid item xs={12}>
          </Grid>        
          <Grid item xs={12}>
            <InputLabel id="post-message-label">Message</InputLabel>     
            <Avatar alt={user.name} src={user.avatar} className="usr"  />
            <MaxHeightTextarea id="message" name="message"
              css={css}
              placeholder="What times, difficulty or other partner preferences can you share?" />
          </Grid>
        </Grid>
      </form>
    </div>
  </Container>
}

/*
<a href="{{#if me}}#{{else}}/reply/{{_id}}{{/if}}">    
  {{#if me}}{{else}}<i class="ion-chatboxes"> </i>{{/if}}
  <img class="usr" src="{{user.avatar}}" alt="{{user.name}}" />
  <h3>{{ first user.name}}</h3>    
  <h4>{{ date this }} {{place.name}}</h4>
  <div>{{{markup message}}}</div>
  <footer>
    <div>
      {{#if me}}
      {{else}}
      <i class="glyphicon glyphicon-comment"></i>
      <span> Reply </span>
      {{/if}}
    </div>

    <ul>{{#each climbing }}
      <li><img src="/climb-{{climb this}}.png" /></li>{{/each}}
    </ul>

    {{#if place.logo}}<img class="place" src="{{place.logo}}" alt="{{place.name}}" />{{/if}}
  </footer>      
</a>
*/

export function PostTile({css,data}) {
  let {_id,time,place,user,climbing,message} = data
  
  let items = climbing.map( c => 
    <li key={_id+c}>
      <img src={'/climb-'+(c == 'tr' ? 'toprope' : c)+'.png'} />
    </li>)

  return (
    <ListItem xs={4}
      key={_id} 
      alignItems="flex-start"
      className={css.postTile}
    >
      <Avatar alt={user.name} src={user.avatar} className="usr"  />
      <h3>{user.name}</h3>
      <h4>{place.name}</h4>
      <div dangerouslySetInnerHTML={({__html:message})}/>
      <footer>
        <div>
          <EmailOutlinedIcon label="reply" /><span>reply</span>
        </div>
        <ul>{items}</ul>
        <img className="place" src={place.logo} alt={place.name} hidden={!place} />
      </footer>
    </ListItem>
  )
}


export function PostList({data}) {
  if (!data) return null
  
  let css = themeStyles()
  let items = data.posts
    .map(m => <PostTile key={m._id} css={css} data={m} />)

  return (
    <List className="feed" spacing={1}>{items}</List>
  )
}
