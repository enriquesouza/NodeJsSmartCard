const express = require('express');
const pay = require('./pay');
const router = express.Router();
router.post('/pay', async (req, res) => {
    try {
        res.json(await pay(req.body.pin, req.body.qrCodeResult, req.body.amountTo, req.body.addressTo));
    } catch (err) {
        res.status(400).send(err.message);
    }
});
module.exports = router;