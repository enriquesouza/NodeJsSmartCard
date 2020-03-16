const _ = require('lodash');
const decrypt = require('../../lib/decrypt');
const getSecret = require('../../lib/secret');
const parseCardQrCode = require('../../lib/qrCodeParser');
const sendFromSAPI = require('../../lib/sapi');

module.exports =
    async function pay(_pin, _qrCodeCardResult, _amountTo, _addressTo) {
        try {

            let _parsedQrCodeCard = parseCardQrCode(_qrCodeCardResult);

            if (_.isUndefined(_parsedQrCodeCard) || _.isNull(_parsedQrCodeCard))
                return null;

            if (_.isUndefined(_parsedQrCodeCard.address) || _.isNull(_parsedQrCodeCard.address))
                return null;

            if (_.isUndefined(_parsedQrCodeCard.card) || _.isNull(_parsedQrCodeCard.card))
                return null;

            let _secret = await getSecret(_pin, _parsedQrCodeCard.address);

            if (_.isUndefined(_secret) || _.isNull(_secret))
                return null;

            let _key = _pin + _secret;

            if (_.isUndefined(_key) || _.isNull(_key))
                return null;

            let decryptedPK = decrypt(_parsedQrCodeCard.card, _key);

            if (_.isUndefined(decryptedPK) || _.isNull(decryptedPK))
                return null;

            let payLoad = {
                amount: _amountTo,
                from: _parsedQrCodeCard.address,
                key: decryptedPK,
                to: _addressTo
            };

            return await sendFromSAPI(payLoad.to,payLoad.amount, payLoad.key)

        } catch (err) {
            throw err;
        }
    }
