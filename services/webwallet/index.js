require('dotenv').config()

var request = require('request-promise')

module.exports = async (jsonBody) => {

    var options = {
        method: 'POST',
        uri: process.env.URL_WEB_WALLET_CREATE_RAW_TX,
        body: jsonBody,
        json: true
    };

    try {
        return await request(options);
    } catch (err) {
        console.error(err);
        throw err;
    }
};