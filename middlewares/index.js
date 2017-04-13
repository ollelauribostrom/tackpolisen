/**
 * Exporting Middlewares
 *
 * @author ollelauribostrom
 */

'use strict';

// Require dependencies
const error       = require('./error');
const checkAccess = require('./checkAccess');

/**
 * Exports
 */
module.exports = {
  error,
  checkAccess
};
