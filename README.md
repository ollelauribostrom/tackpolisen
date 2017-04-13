## Tack Polisen API

### Endpoints
| Method | Path                        | Parameters                | Body                        | Return                      |
| ------ | --------------------------- | ------------------------- | --------------------------- | --------------------------- |
| GET    | /api/tweets/:offset         | **offset**(optional): offsets search result by offset * limit            |  | Array of whitelisted tweets |
| GET    | /api/tweets/starred/:offset | **offset**(optional): offsets search result by offset * limit            | | Array of starred tweets     |
| POST   | /admin/tweets               |                           | **adminToken**(required): secret for access to admin-api, **limit**(required): How many to return, **offset**(optional): offsets search result by offset * limit, **filter**(optional): Filter object  | Array of all saved tweets fitting criteria   |
| PATCH  | /admin/tweets/:id           | **id**(required): Id of tweet to update | **adminToken**(required): secret for access to admin-api, **status**(required): Updated status as object, ex ```{ whitelisted: true, starred: true }``` | Updated tweet (Object)      |


##### Currently available search filters
```
filters: {
  filter_level: String,
  whitelisted: Boolean,
  starred: Boolean,
  lang: String 
}
```
Used as: `filters: {"filters.lang": "en"}`

### Run local 
- Make sure mongodb is installed
- Install dependencies: `npm install`
- Start mongodb: `mongod`
- Start application: `npm run dev`

### Configuaration
Projects config-file found in config/index.js reads from environment variables. The following environment variables is needed to get up and running, ex placed in .env-file:
- ADMIN_TOKEN= {secret for access to admin api}
- DEFAULT_LIMIT= {default limit for num of tweets returned}
- CONSUMER_KEY = {twitter consumer key}
- CONSUMER_SECRET = {twitter consumer secret}
- ACCESS_TOKEN_KEY = {twitter access token key}
- ACCESS_TOKEN_SECRET = {twitter access token secret}

##### Optional
- PORT= {portnumber} - Defaults to `5000`
- DB_ADRESS= {adress to db} - Defaults to `mongodb://localhost:27017/tackpolisen`

What hashtags to track is specified as a string in: config/index.js (twitter.streamParameters.track)

### todo / ideas
- Include hashtags in search filters
- Include user mentions in search filters
- Automatically exclude tweets containing certain hashtag 
- Automatically exclude tweets for certain user
- Include tweet id in Mongoose schema
- Set up Application Only based authentication instead of User based authentication
