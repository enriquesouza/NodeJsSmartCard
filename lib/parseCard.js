const queryString = require('querystring')
const prefixQueryStringQrCode = "smartcash:"

module.exports = (qr) => {

    if (qr === undefined || qr === null || qr.indexOf(prefixQueryStringQrCode) == -1)
        return null;

    if (qr.indexOf('?') > -1) {
        let parts = qr.split('?');
        let _address = parts[0].replace(prefixQueryStringQrCode, "");
        let query = queryString.parse(parts[1]);

        let parsedQr = {
            address: _address,
            parms: query
        }
        return parsedQr;
    } else {
        return {
            address: qr.replace(prefixQueryStringQrCode, ""),
            parms: {}
        }
    }
}