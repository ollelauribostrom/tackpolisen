/**
 * Admin access middleware
 *
 * @author ollelauribostrom
 */

'use strict';

// Require dependencies
const config       = require('../config');
const errorFactory = require('../lib/errorFactory');

module.exports = (req, res, next) => {

  if (req.body.adminToken === config.adminToken) {
    return next();
  }

  res.status(401).json(errorFactory(401, 'Please provide valid adminToken'));
};
