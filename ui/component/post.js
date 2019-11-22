import React from 'react'
import themeStyles from '../theme';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } 
             from '@material-ui/core';

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

export function PostTile(props) {
  let {css} = props
  let {_id,time,place,user,climbing,message} = props.data
  
  let items = climbing.map( c => 
    <li key={_id+c}>
      <img src={"/climb-"+(c == 'tr' ? 'toprope' : c)+".png"} />
    </li>);

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
  );
}


export function PostList(props) {
  if (!props.data) return null;
  
  const css = themeStyles()
  const items = props.data.posts
                     .map(m => <PostTile key={m._id} css={css} data={m} />)

  return (
    <List className="feed" spacing={1}>{items}</List>
  );
}
