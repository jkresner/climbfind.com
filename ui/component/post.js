import React, { useState } from 'react'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import themeStyles from '../theme'
import { MaxHeightTextarea } from './input'
import { Avatar, Checkbox, Grid, IconButton, List, ListItem, InputLabel, 
  FormControl, FormControlLabel, FormGroup, Container, 
  CssBaseline, MenuItem, Select } from '@material-ui/core'


const clone = (orig, alter) => Object.assign({}, orig, alter||{}) 


//value=tr
//iconImg=toprope.png
function CheckboxClimbing(props) {
  return <FormControlLabel 
    label={props.label}
    className={'climb-'+props.value}
    labelPlacement="bottom"
    control={<Checkbox value={props.value} checked={props.checked} onChange={props.onChange}
      icon={<IconButton><img src={'/climb-'+props.iconImg} /></IconButton>} />}
  />
}


function SelectCity(props) {
  let css = props.css
  let places = props.places
  let cities = Object.keys(places.area)
    .filter(id => props.places.area[id].linked.length > 0)
    .map(id => <MenuItem key={id} value={id}>{props.places.area[id].name}</MenuItem>)

  return <FormControl variant="outlined" className={css.formControl}>
    <InputLabel id="city-select-label"></InputLabel>
    <Select id="city" name="city"
      fullWidth={true}
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
      autoWidth={true}
      fullWidth={true}
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
  let {places} = props.data

  // let [post,setPost] = useState(props.data.post||{})
  let [vd,setVD] = useState({
    hide: {place:0,climbing:1,day:1,msg:1},
    fv: {
      cityId: '597e2008dda0727873a576fc',
      placeId: '',
      logo: '',
      climbing: {boulder:false,lead:false,tr:false}
    }
  })
  // let [hide,setHide] = useState()
  // let [fv,setFv] = useState()

  console.log('PostForm.render.setVD', vd.fv, vd.hide)  
  
  // let [city,setCity] = useState()
  // let [place,setPlace] = useState('')
  // let [climbing,setClimbing] = useState({})
  // let [day,setDay] = useState(null)
  // let [message,setMessage] = useState(null)

  let handleCity = e => {
    let ups = { cityId:e.target.value, placeId:'', logo:'' }
    let fv = clone(vd.fv, ups)
    setVD(clone(vd, {fv}))
  }

  let handlePlace = e => {
    let placeId = e.target.value
    let {logo} = places.indoor[placeId]
    let fv = clone(vd.fv, {placeId,logo})
    let hide = clone(vd.hide, {place:1,climbing:0})
    setVD(clone(vd,{fv,hide}))
    // let p = placeData.indoor[e.target.value]
    // setPost(iMute(post,{place:p,logo:p.logo}))
  }

  let handleClimbing = e => {
    let type = e.target.value
    let climbing = clone(vd.fv.climbing, {[type]:e.target.checked})    
    let hasClimbing = climbing.lead || climbing.tr || climbing.boulder
    let fv = clone(vd.fv, {climbing})
    let hide = clone(vd.hide, {day:!hasClimbing})
    setVD(clone(vd,{fv,hide}))
  }

  /*  const handleChange = name => event => {
    // TODO review syntax
    setState({ ...state, [name]: event.target.checked });
  }; */ 

  function cheat() {
    if (!vd.fv.placeId) {
      console.log('cheat.handlePlace')
      // setFv(iMute(fv, {cityId:'597e2008dda0727873a576fc'}))
      handlePlace({target:{value:'597e2073dba1187878dcbb20'}})
    }
  }  
  setTimeout(cheat, 40)  
  // fetch(`/api/chats/read/${val._id}`)
  //     .then(res => res.json())
  //     .then(r => {
  //       let dat = Object.assign({title},r)
  //       setChat(dat)
  //     })
  //     .catch(console.log) 

  return <Container component="main" maxWidth="sm" id="sup" className={css.paper}>
    <CssBaseline />
    <form className={css.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} hidden={vd.hide.place}>
          <SelectCity css={css} value={vd.fv.cityId} handleCity={handleCity} places={places} />
        </Grid>
        <Grid item xs={12} hidden={vd.hide.place}>
          <SelectPlace css={css} value={vd.fv.placeId} city={vd.fv.cityId} handlePlace={handlePlace} places={places} />
        </Grid>
        <Grid item xs={12} hidden={vd.hide.climbing}>
          <div className="logo"><img src={vd.fv.logo} /></div>
        </Grid>
        <Grid item xs={12} hidden={vd.hide.climbing}>
          <FormGroup className="climbing" data-toggle="buttons">                        
            <CheckboxClimbing label="Top rope" onChange={handleClimbing}
              value="tr" iconImg="toprope.png" checked={vd.fv.climbing.tr} />
            <CheckboxClimbing label="Lead climb" onChange={handleClimbing}
              value="lead" iconImg="lead.png" checked={vd.fv.climbing.lead} />
            <CheckboxClimbing label="Boulder" onChange={handleClimbing}
              value="boulder" iconImg="boulder.png" checked={vd.fv.climbing.boulder} />
          </FormGroup>
        </Grid>        
        <Grid item xs={12} hidden={vd.hide.day}>
          <InputLabel id="day-select-label">Day</InputLabel>
        </Grid>
        <Grid item xs={12} hidden={vd.hide.msg}>
          <InputLabel id="post-message-label">Message</InputLabel>     
          <Avatar alt={user.name} src={user.avatar} className="usr"  />
          <MaxHeightTextarea id="message" name="message"
            css={css}
            placeholder="What times, difficulty or other partner preferences can you share?" />
        </Grid>
      </Grid>
    </form>
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
