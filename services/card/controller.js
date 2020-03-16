const express = require('express');
const router = express.Router();
const pay = require('../smartpay/pay');
const qrCode = require('qrcode-terminal');
const smartCashKeyGenerator = require('../../lib/smartCashKeyGenerator')

router.get('/new', async (req, res) => {
    try {
        smartCashKeyGenerator.generateOrGetKeyPairAndSaveIt();
        
        qrCode.generate(`smartcash:${keyPair.address}?amount=0.001`, {
            small: true
        });

        if (secret.password !== secret.passwordConfirmation)
            throw new Error(`Your password does not match. Restart the process to encrypt your card.`);

        let myEncryptedKey = await smartCashKeyGenerator.encryptKey(secret.password, keyPair);

        let cardURI = smartCashKeyGenerator.generateURICard(keyPair, myEncryptedKey);

        smartCashKeyGenerator.saveCardURI(cardURI);

        await smartCashKeyGenerator.createAndSavePngQrCode(cardURI);

        await smartCashKeyGenerator.createAndSaveHtmlQrCode(cardURI);

        res.status(200).send(qrCode.generate(cardURI, {small: true}));

    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/activate', async (req, res) => {
    try {
        res.json(await pay(req.body.pin, req.body.qrCodeResult, req.body.amountTo, req.body.addressTo));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
