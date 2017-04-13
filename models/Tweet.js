/**
 * Tweet model
 *
 * @author ollelauribostrom
 * @version 1.0
 */

'use strict';

// Require dependencies
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

/**
 * Tweet schema
 */
const tweetSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  filters: {
    filter_level: { type: String, required: true },
    whitelisted: { type: Boolean, required: true },
    starred: { type: Boolean, required: true },
    lang: { type: String, required: true }
  }
});

/**
 * Get all whitelisted tweets
 * @param  {Number} limit
 * @param  {Number} offset
 * @return {Promise}
 */
tweetSchema.statics.getWhitelisted = function(limit, offset = 0) {

  return new Promise((resolve, reject) => {

    let filter = { 'filters.whitelisted': true };
    let skip = Math.abs(offset) * limit;

    this.find(filter)
      .sort({date: -1})
      .skip(skip)
      .limit(limit)
      .then(tweets => resolve(tweets))
      .catch(err => reject(err));
  });
};

/**
 * Get all starred tweets
 * @param  {Number} limit
 * @param  {Number} offset
 * @return {Promise}
 */
tweetSchema.statics.getStarred = function(limit, offset = 0) {

  return new Promise((resolve, reject) => {

    let filter = { 'filters.starred': true };
    let skip = Math.abs(offset) * limit;

    this.find(filter)
      .sort({date: -1})
      .skip(skip)
      .limit(limit)
      .then(tweets => resolve(tweets))
      .catch(err => reject(err));
  });
};

/**
 * Get all tweets - optional filter
 * @param  {Number} limit
 * @param  {Number} offset
 * @param  {Object} filter
 * @return {Promise}
 */
tweetSchema.statics.getAll = function(limit, offset = 0, filter = {}) {

  return new Promise((resolve, reject) => {

    let skip = Math.abs(offset) * limit;

    this.find(filter)
      .sort({date: -1})
      .skip(skip)
      .limit(limit)
      .then(tweets => resolve(tweets))
      .catch(err => reject(err));
  });
};

/**
 * Change status on tweet
 * @param  {ObjectId} id
 * @param  {Object} status
 * @return {Promise}
 */
tweetSchema.statics.setStatus = function(id, status) {

  return new Promise((resolve, reject) => {

    this.findOne({_id: id})
      .then(tweet => {
        tweet.filters = Object.assign(tweet.filters, status);
        tweet.save()
          .then(() => resolve(tweet))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
};

/**
 * Exports
 */
module.exports = mongoose.model('Tweet', tweetSchema);
