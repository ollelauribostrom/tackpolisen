/**
 * Config variables
 *
 * @author ollelauribostrom
 */

'use strict';

module.exports = {
  port: process.env.PORT || 5000,
  dbAdress: process.env.DB_ADRESS || 'mongodb://localhost:27017/tackpolisen',
  adminToken: process.env.ADMIN_TOKEN,
  defaultLimit: Number(process.env.DEFAULT_LIMIT) || 100,
  twitter: {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    streamParameters: { track: 'omxs30,olympics' }
  }
};
