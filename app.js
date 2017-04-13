/**
 * Entry point for tackpolisen API
 *
 * @author ollelauribostrom
 * @version 1.0
 */

'use strict';

// Load .env file
require('dotenv').config();

// Require dependencies
const express         = require('express');
const config          = require('./config');
const routes          = require('./routes');
const middlewares     = require('./middlewares');
const bodyParser      = require('body-parser');
const helmet          = require('helmet');
const mongoose        = require('mongoose');
const Twitter         = require('twitter');
const onTweet         = require('./lib/onTweet');
const onTweetError    = require('./lib/onTweetError');
const app             = express();

// Twitter
const client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

// Connect to db
mongoose.Promise = global.Promise;
mongoose.connect(config.dbAdress);
mongoose.connection.on('error', error => console.log(error));
mongoose.connection.once('open', () => console.log('Connected to database'));

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Use helmet
app.use(helmet());

// Stream tweets
client.stream('statuses/filter', config.twitter.streamParameters, (stream) => {
  stream.on('data', onTweet);
  stream.on('error', onTweetError);
});

// Define routes
app.use('/api', routes.api);
app.use('/admin', middlewares.checkAccess, routes.admin);

// Error handler
app.use(middlewares.error);

// Spin up server
app.listen(config.port, () => {
  console.log(`Server running at ${config.port}`);
});
