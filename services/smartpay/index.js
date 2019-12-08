const decrypt = require('../../lib/decrypt');
const getSecret = require('../../lib/secret');
const parseCardQrCode = require('../../lib/qrCodeParser')
const _ = require('lodash');

const request = require('request-promise');

async function pay(_password, _addressFrom, _amountTo, _addressTo, _wif) {

    let _secret = await getSecret(_addressFrom);

    let _key = _password + _secret;

    let decryptPK = decrypt(_wif, _key)

    return decryptPK;

}
/*
let qrCode = "smartcash:SfuQ4fg5ARKaXoKsSD9BnxN4N7DubnqMEp?card=2a8771425c214abc53f82efc54c7c9e0c2f0926105777012193bd73b6e7ede81bcf61372888112e2bdb18c3a5f9b54ebc79209a6a65305255c5c829f9fc4248d"
let parsedQrCode = parseCardQrCode(qrCode);
console.log(parsedQrCode);

qrCode = "smartcash:SfuQ4fg5ARKaXoKsSD9BnxN4N7DubnqMEp"
parsedQrCode = parseCardQrCode(qrCode);
console.log(parsedQrCode);

qrCode = "smartcash:SfuQ4fg5ARKaXoKsSD9BnxN4N7DubnqMEp?amount=1000&message=oi"
parsedQrCode = parseCardQrCode(qrCode);
console.log(parsedQrCode);
*/