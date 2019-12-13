const request = require('request-promise');
require('dotenv').config()
module.exports = async (_pin, _address) => {
    let options = {
        method: 'POST',
        uri: process.env.URL_GET_SECRET,
        body: {
            pin: _pin,
            address: _address
        },
        json: true
    };

    try {
        return await request.post(options);
    } catch (err) {
        throw err;
    }
};