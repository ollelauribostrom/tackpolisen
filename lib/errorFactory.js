/**
 * Error factory
 *
 * @author ollelauribostrom
 */

'use strict';

module.exports = (status = 500, message = 'Something went wrong!') => {
  let error = new Error(message);
  error.status = status;
  return error;
};
