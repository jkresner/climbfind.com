import React, { useEffect, useState } from 'react'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import themeStyles from '../theme'
import { SelectCity, SelectPlace, SelectDay, MaxHeightTextarea } from './input'
import { Avatar, Button, Checkbox, Grid, IconButton, List, ListItem, InputLabel, 
  FormControlLabel, FormGroup, Container, CssBaseline } from '@material-ui/core'


const clone = (orig, alter) => Object.assign({}, orig, alter||{}) 


function CheckboxClimbing(props) {
  let icon = <IconButton><img src={'/climb-'+props.iconImg} /></IconButton> 
  let className = `climb-${props.value}` + (props.checked?' active':'')

  return <FormControlLabel 
    label={props.label}
    className={className}
    labelPlacement="bottom"
    control={<Checkbox
      value={props.value} 
      checked={props.checked} 
      onChange={props.onChange}
      checkedIcon={icon}
      icon={icon} />}
  />
}


export function PostForm(props) {
  if (!props.data) return null

  let {css,user} = props
  let {places,cities} = props.data

  let __sanfan = '597e2008dda0727873a576fc',
    __miscliff = '597e2073dba1187878dcbb20'
  
  let [vd,setVD] = useState({
    hide: {place:0,climbing:1,day:1,msg:1},
    fd: { places: places.area[__sanfan].linked },
    fv: {
      type: 'indoor',
      cityId: __sanfan,
      day: '',
      placeId: '',
      logo: '',
      message: 'testing partner call',
      climbing: {boulder:true,lead:false,tr:false}
    }
  })
  // let [post,setPost] = useState(props.data.post||{})

  console.log('PostForm.render.setVD', vd.fv, user)  

  let onChangeCity = e => {
    let ups = { cityId:e.target.value, placeId:'', logo:'' }
    let fv = clone(vd.fv, ups)
    let fd = clone(vd.fd, {places: places.area[ups.cityId].linked })
    setVD(clone(vd, {fv,fd}))
  }

  let onChangePlace = e => {
    let placeId = e.target.value
    let {logo} = places.indoor[placeId]
    let fv = clone(vd.fv, {placeId,logo})
    let hide = clone(vd.hide, {place:1,climbing:0,day:0})
    setVD(clone(vd,{fv,hide}))
  }

  let onChangeClimbing = e => {
    let type = e.target.value
    let climbing = clone(vd.fv.climbing, {[type]:e.target.checked})    
    let hasClimbing = climbing.lead || climbing.tr || climbing.boulder
    let fv = clone(vd.fv, {climbing})
    let hide = clone(vd.hide, {day:!hasClimbing})
    setVD(clone(vd,{fv,hide}))
  }

  let onChangeDay = e => {
    console.log('onChangeDay.target', e.target.value)
    let fv = clone(vd.fv, {day:e.target.value})
    let hide = clone(vd.hide, {day:1,climbing:1,msg:0})
    setVD(clone(vd,{fv,hide}))
  }

  let onSubmit = () => {    
    let data = clone(vd.fv, {climbing:[]})
    Object.keys(vd.fv.climbing)
      .forEach(c => vd.fv.climbing[c] ? data.climbing.push(c) : 0)
    
    console.log('data', data, vd.fv.climbing)
    fetch(`/api/posts/${vd.fv.placeId}`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(r => {
        // console.log('ok', r)
        window.location = '/app/account'
        //       let dat = Object.assign({title},r)
        //       setChat(dat)
      })
      .catch(console.log) 
  }

  function cheat() {
    if (!vd.fv.placeId) {
      console.log('cheat.handlePlace')
      // setFv(iMute(fv, {cityId:'597e2008dda0727873a576fc'}))
      onChangePlace({target:{value:__miscliff}})
      // onChangeClimbing({target:{value:'tr'}})      
    }
  }  
  cheat()
  // setTimeout(cheat, 40)  

  return <Container component="main" maxWidth="sm" id="sup" className={css.paper}>
    <CssBaseline />
    <form className={css.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} hidden={vd.hide.msg}>
          <InputLabel id="post-message-label"></InputLabel>     
          <Avatar alt={user.name} src={user.avatar} className="usr"  />
          <MaxHeightTextarea id="message" name="message"
            value={vd.fv.message}
            css={css}
            placeholder="What times, difficulty or other partner preferences can you share?" />
          <Button onClick={onSubmit}>Submit</Button>
        </Grid>
        <Grid item xs={12} hidden={vd.hide.place}>
          <SelectCity css={css} value={vd.fv.cityId} onChange={onChangeCity} cities={cities} />
        </Grid>
        <Grid item xs={12} hidden={vd.hide.place}>
          <SelectPlace css={css} value={vd.fv.placeId} onChange={onChangePlace} places={vd.fd.places} />
        </Grid>
        <Grid item xs={12} hidden={vd.hide.climbing}>
          <div className="logo"><img src={vd.fv.logo} /></div>
        </Grid>
        <Grid item xs={12} hidden={vd.hide.climbing}>
          <FormGroup className="climbing" data-toggle="buttons" row>
            <CheckboxClimbing label="Top rope" onChange={onChangeClimbing}
              value="tr" iconImg="toprope.png" checked={vd.fv.climbing.tr} />
            <CheckboxClimbing label="Lead climb" onChange={onChangeClimbing}
              value="lead" iconImg="lead.png" checked={vd.fv.climbing.lead} />
            <CheckboxClimbing label="Boulder" onChange={onChangeClimbing}
              value="boulder" iconImg="boulder.png" checked={vd.fv.climbing.boulder} />
          </FormGroup>
        </Grid>        
        <Grid item xs={12} hidden={vd.hide.day}>
          <SelectDay value={vd.fv.day} onChange={onChangeDay} />
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
