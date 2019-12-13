let prefixQueryStringQrCode = "smartcash:"
let cardQueryStringQrCode = "?card="

function contains(str, substr) {
    if (str.indexOf(substr) > -1) {
        return true;
    }
    return false;
}

function parseQrCodeWithValue(qrCodeString) {


    let startPrefix = qrCodeString.indexOf(prefixQueryStringQrCode)
    let endPrefix = qrCodeString.indexOf(cardQueryStringQrCode)

    let startAmount = qrCodeString.indexOf(cardQueryStringQrCode)
    let endAmount = qrCodeString.length


    let address = qrCodeString.substring(startPrefix + prefixQueryStringQrCode.length, endPrefix)
    let card = qrCodeString.substring(startAmount + cardQueryStringQrCode.length, endAmount)

    return `${address}-${card}`

}

function parseQrCodeWithoutValue(qrCodeString) {

    let startPrefix = qrCodeString.indexOf(prefixQueryStringQrCode)
    let endPrefix = qrCodeString.length

    let address = qrCodeString.substring(startPrefix + prefixQueryStringQrCode.length, endPrefix)
    let card = "0"

    return `${address}-${card}`

}

function parseQrCode(qrCodeString) {
    if (qrCodeString.indexOf(prefixQueryStringQrCode) >= 0 && qrCodeString.indexOf(cardQueryStringQrCode) >= 0) {
        return parseQrCodeWithValue(qrCodeString)
    } else if (contains(qrCodeString, prefixQueryStringQrCode) && !contains(qrCodeString, cardQueryStringQrCode)) {
        return parseQrCodeWithoutValue(qrCodeString)
    } else {
        return qrCodeString
    }
}

function parseCardQrCode(qrCodeString) {

    let str = parseQrCode(qrCodeString).split("-");

    if (str[0].indexOf("?") > -1) {
        let fix = str[0].split(`?`)[0]
        return {
            address: fix,
            card: "0"
        };
    }

    return {
        address: str[0],
        card: str[1]
    };
}

module.exports = parseCardQrCode;