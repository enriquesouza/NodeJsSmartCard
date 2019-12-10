const request = require('request-promise');
const format = require('string-format');
require('dotenv').config()
module.exports = async (address) => {
    let secret = null;
    try {
        secret = await request.get(format(process.env.URL_GET_SECRET, address), {
            json: true
        });
    } catch (err) {
        console.log(err.message);
    }
    return secret;
};