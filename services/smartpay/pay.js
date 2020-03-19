const _ = require('lodash');
const decrypt = require('../../lib/decrypt');
const parseCardQrCode = require('../../lib/qrCodeParser');
const sendFromSAPI = require('../../lib/sapi');

module.exports =
    async function pay(_pin, _qrCodeCardResult, _amountTo, _addressTo) {
        try {

            let {address, card} = parseCardQrCode(_qrCodeCardResult);

            if (_.isUndefined(address) || _.isNull(address))
                return null;

            if (_.isUndefined(card) || _.isNull(card))
                return null;
            
            const pinEncrypted = encrypt(_pin, process.env.CRYPTO_SECRET);
            
            let decryptedPK = decrypt(card, pinEncrypted + process.env.CRYPTO_SECRET);

            if (_.isUndefined(decryptedPK) || _.isNull(decryptedPK))
                return null;

            let payLoad = {
                amount: _amountTo,
                from: address,
                key: decryptedPK,
                to: _addressTo
            };

            return await sendFromSAPI(payLoad.to, payLoad.amount, payLoad.key)

        } catch (err) {
            throw err;
        }
    }
