const express = require('express');
const router = express.Router();
const pay = require('../smartpay/pay');
const smartCashKeyGenerator = require('../../lib/smartCashKeyGenerator')
const webQrCode = require('qrcode');
const amount = 0.001;

router.get('/new', async (req, res) => {
    try {
        const keyPair = smartCashKeyGenerator.generateKey();
        const cardURI = smartCashKeyGenerator.generateURICard(keyPair);
        let response;
        switch (req.query.type) {
            case 'qrcode':
                response = `<img src="${await webQrCode.toDataURL(cardURI)}"/>`;
                break;
            case 'uri':
                response = cardURI;
                break;
            default:
                response = keyPair;
        }
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/activate', async (req, res) => {
    try {
        res.json(await pay(req.body.pin, req.body.key, amount, req.body.addressTo));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
