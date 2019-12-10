const request = require('request-promise');
const _ = require('lodash');
const decrypt = require('../../lib/decrypt');
const getSecret = require('../../lib/secret');
const parseCardQrCode = require('../../lib/qrCodeParser');
const webWalletSend = require('../webwallet/index');

module.exports =
    async function pay(_pin, _qrCodeResult, _amountTo, _addressTo) {

        let _parsedQrCode = parseCardQrCode(_qrCodeResult);

        if (_.isUndefined(_parsedQrCode) || _.isNull(_parsedQrCode))
            return null;

        if (_.isUndefined(_parsedQrCode.address) || _.isNull(_parsedQrCode.address))
            return null;

        if (_.isUndefined(_parsedQrCode.card) || _.isNull(_parsedQrCode.card))
            return null;

        let _secret = await getSecret(_parsedQrCode.address);

        if (_.isUndefined(_secret) || _.isNull(_secret))
            return null;

        let _key = _pin + _secret;

        if (_.isUndefined(_key) || _.isNull(_key))
            return null;

        let decryptedPK = decrypt(_parsedQrCode.card, _key);

        if (_.isUndefined(decryptedPK) || _.isNull(decryptedPK))
            return null;

        let sendResponse = await webWalletSend({
            amount: _amountTo,
            from: _parsedQrCode.address,
            key: decryptedPK,
            to: _addressTo
        });
        return sendResponse;
    }