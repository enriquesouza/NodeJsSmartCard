const request = require('request-promise');
module.exports = async (address) => {
    let secret = null;
    try {
        secret = await request.get(`http://localhost:8088/api/crypto/${address}`, {
            json: true
        });
    } catch (err) {
        console.log(err.message);
    }
    return secret;
};