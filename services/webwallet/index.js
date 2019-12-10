var request = require('request-promise')
require('dotenv').config()
let send = async function sendByPrivateKey(jsonBody) {

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
        return null;
    }
}

modules.export = send;