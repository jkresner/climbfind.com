#### Guidelines

Each API endpoint expects the exact input parameters described under *validate* and will fail if any parameters are missing, do not match the specified type or validation logic. Logic of each endpoint is described under *exec*. Shape of response is described under *project*.

### /posts

#### GET /posts

##### exec

- If sessionId available use user's subscriptions to customize feed else return latest site-wide partner calls

##### project

- Returns no posts marked as deleted

```
[
  {
    id             guid      
    day            int        // utc time of date climbing  
    message        string
    user           object
      id           guid  
      name         string
      avatar       string
    place          object
      id           guid  
      name         string
      shortName    string
      pic          string 
  }
]
```


#### POST /posts

##### validate

param|type|desc
----------------|----------|----------------
fb_accessToken  |string    |successfully allows server to retrieve profile info
placeId         |guid      |exists in places collection, fail duplicate userId+placeId+day
day             |string    |mon/tue/wed/thu/fri/sat/sun
message         |string    |min 25 characters, fail unsafe strings

##### exec

- Create user if no existing user matches fb_id
- Create partner call
- Subscribe user to place if not already subscribed

##### project

```
{
  id            guid      // generated         
  day           int       // utc time of day climbing  
  message       string    
  user          object                      
    id          guid                        
    name        string                      
    avatar      string                      
  place         object                     
    id          guid                        
    name        string                      
    shortName   string                      
    pic         string                    
}             
```

#### DELETE /posts/{id}

##### validate

param|type|desc
----------------|----------|----------------
id              |guid      |partner call with id belongs to userId of session

##### exec

- Marks post deleted with utc datetime value

##### project

- Empty object {}

### /subscriptions

#### GET /subscriptions

#### PUT /subscriptions/{id}

### /messages

#### GET /messages

##### exec

- Get threads for user based on sessionId
- Returns no threads marked as deleted by user

#### GET /messages/{id}

##### exec

- Get completed thread by id

#### POST /messages/{id}

##### exec

- Post new message to thread

#### DELETE /messages/{id}

##### exec

- Mark thread as deleted for user based on sessionId







