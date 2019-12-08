const request = require('request');
module.exports = (address, fnReturn) => {
    let url = `http://localhost:8088/api/crypto/${address}`
    request(url, fnReturn);
};