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
const config        = require('../config');
const defaultLimit  = config.defaultLimit;

/**
 * ROUTE: /api/tweets
 */
router.route('/tweets/:offset')
  .all((req, res, next) => next()) // Log here
  .get((req, res, next) => {
    Tweet.getWhitelisted(defaultLimit, req.params.offset)
      .then(tweets => res.json(tweets))
      .catch(err => next(err));
  });

/**
 * ROUTE: /api/tweets/starred
 */
router.route('/tweets/starred/:offset')
  .all((req, res, next) => next()) // Log here
  .get((req, res, next) => {
    Tweet.getStarred(defaultLimit, req.params.offset)
      .then(tweets => res.json(tweets))
      .catch(err => next(err));
  });

/**
 * Exports
 */
module.exports = router;
