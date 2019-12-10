const request = require('request');
const format = require('string-format');
require('dotenv').config();
module.exports = (address, fnReturn) => request(format(process.env.URL_GET_SECRET, address), fnReturn);
