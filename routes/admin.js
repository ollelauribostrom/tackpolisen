/**
 * API route
 *
 * @author ollelauribostrom
 */

'use strict';

// Require dependencies
const express       = require('express');
const router        = express.Router();
const Tweet         = require('../models/Tweet');

/**
 * ROUTE: /admin/tweets
 */
router.route('/tweets/:id?')
  .post((req, res, next) => {
    Tweet.getAll(req.body.limit, req.body.offset, req.body.filter)
      .then(tweets => res.json(tweets))
      .catch(err => next(err));
  })
  .patch((req, res, next) => {
    Tweet.setStatus(req.params.id, req.body.status)
      .then(tweet => res.json(tweet))
      .catch(err => next(err));
  });

/**
 * Exports
 */
module.exports = router;
