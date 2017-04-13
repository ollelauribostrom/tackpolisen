/**
 * onTweet module
 *
 * @author ollelauribostrom
 */

'use strict';

// Require dependencies
const Tweet      = require('../models/Tweet');
const xssFilters = require('xss-filters');

module.exports = (tweet) => {

  // Exclude retweets
  if (tweet.text.search('RT') === -1 && !tweet.retweeted) {

    // Create new Tweet
    const newTweet = new Tweet({
      text: xssFilters.inHTMLData(tweet.text),
      author: {
        screen_name: xssFilters.inHTMLData(tweet.user.screen_name),
        name: xssFilters.inHTMLData(tweet.user.name),
        id: tweet.user.id,
        profile_image_url: tweet.user.profile_image_url
      },
      date: new Date(tweet.created_at),
      filters: {
        filter_level: tweet.filter_level,
        whitelisted: false,
        starred: false,
        lang: tweet.lang
      }
    });

    // Save Tweet
    newTweet.save()
      .then(() => console.log('SAVED'))
      .catch(err => console.log(err.message));
  }
};
