var request = require('request-promise')

let send = async function sendByPrivateKey(jsonBody) {

    var options = {
        method: 'POST',
        uri: 'https://api.smartcash.cc/v1/exchange/transaction',
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