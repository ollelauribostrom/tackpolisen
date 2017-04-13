/**
 * Error middleware
 *
 * @author ollelauribostrom
 */

'use strict';

module.exports = (err, req, res, next) => {

  // console.log(err);

  if (!err.status) {
    err.status = 500;
    err.message = 'Something went wrong!';
  }

  res.status(err.status).json({message: err.message});
};
