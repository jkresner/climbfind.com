# climbfind_2017

### Run it

`cmd/dev/setup` install npm packages, other dependencies

`cmd/dev/run` with `/server/app.dev.env` config

### Test it

`cmd/test` runs server api and batch worker tests

coffee test/server/index.coffee

### API

### /mod/places

#### GET /mod/places

```
[
  {
    _id          guid      
    name         string 
  }
]
```

#### GET /mod/places/{id}

```
{
  _id            guid      
  name           string
  shortName      string
  type           string      (indoor|outdoor|area)
  climbing       [string]    (boulder|ice|lead|summit|tr|trad|water)
  avatar         string
  logo           string
  tokens         string
  linked         [object]
  geo            object  
  raw            object  
  log            object
  approved       object
  deleted        object
}
```

### /posts

#### GET /posts

If: 
- anonymous => latest site-wide partner calls
- authenticated => customize feed using user's subscriptions

```
[
  {
    _id            guid      
    time           int        utc unix time of date climbing  
    climbing       [string]   (boulder|ice|lead|summit|tr|trad|water)
    message        string
    user           object
      _id          guid  
      name         string
      avatar       string
    place          object
      _id          guid  
      name         string
      shortName    string
      logo         string 
  }
]
```

#### POST /posts/{placeId}

- Create partner call post
- Subscribe user to place if not already

param|type|desc
----------------|----------|----------------
message         |string    |min 25 characters
placeId         |guid      |exists in places collection
day             |int       |0-6 indicating today + N days
*composite*     |          |fail duplicate {userId,placeId,day}

```
{
  _id            guid      
  time           int        utc unix time of date climbing  
  climbing       [string]   (boulder|ice|lead|summit|tr|trad|water)
  message        string
  user           object
    _id          guid  
    name         string
    avatar       string
  place          object
    _id          guid  
    name         string
    shortName    string
    logo         string 
}           
```

### /subscriptions

#### GET /subscriptions

- Set of users subscriptions

```
[
  {
    _id           guid      // generated
    place         object                     
      _id         guid                        
      name        string                      
      shortName   string                      
      avatar      string 
      logo        string                          
    indoor        string    (on|off)
    outdoor       string    (on|off)
    email         string    (on|off)
    push          string    (on|off)   
  }
]            
```

#### PUT /subscriptions/{id}

param|type|desc
----------------|----------|----------------
id              |guid      |exists and subscription belongs to user
beat            |string    |(instant|weekly|off)
indoor          |string    |(on|off)
outdoor         |string    |(on|off)
email           |string    |(on|off)
push            |string    |(on|off)

- Updated subscription

```
[
  {
    _id           guid      // generated
    place         object                     
      _id         guid                        
      name        string                      
      shortName   string                      
      avatar      string 
      logo        string
    indoor        string    (on|off)
    outdoor       string    (on|off)
    email         string    (on|off)
    push          string    (on|off)   
  }
]
```

### /chats

#### GET /chats/inbox

- List of chats user is participating in

```
[
  {
    _id           guid     
    unread        boolean
    with          [object]                     
      _id         guid
      name        string
      avatar      string
    last          object
      _id         guid
      text        string
      user        object
        _id       guid
        name      string
        avatar    string
  }
]            
```

#### GET /chats/read/{id}

- Get complete thread / messages 
- Updates chat.users[].unread for user

```
[
  {
    _id           guid     
    users         [object]                     
      _id         guid
      name        string
      avatar      string
      unread      boolean
    history       [object]
      _id         guid
      text        string
      user        object
        _id       guid
        name      string
        avatar    string
  }
]            
```


#### GET /chats/readpost/{postId}

If [chat] between post.user and authenticated user
- !exist => spoofs a new thread containing a "copy" of post.message
- exists => get complete thread appending a "copy" of post.message

```
[
  {
    _id           guid     
    users         [object]                     
      _id         guid
      name        string
      avatar      string
      unread      boolean
    history       [object]
      _id         guid
      text        string
      user        object
        _id       guid
        name      string
        avatar    string
  }
]            
```

#### POST /chats/message

param|type|desc
----------------|----------|----------------
postId          |guid      |(optional) exists if specified
chatId          |guid      |(optional) exists if specified and user is a participant
text            |string    |required
*composite*     |          |required either {chatId,postId}