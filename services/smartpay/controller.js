const express = require('express');
const pay = require('./pay');
const router = express.Router();
const fs = require('fs');

router.get('/pay', async (req, res) => {
    try {
        let html = fs.readFileSync('./services/smartpay/views/pay.html')
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(html);  
        res.end();
    } catch (err) {
        res.status(400).send(err.message);
    }
});
router.post('/pay', async (req, res) => {
    try {
        res.json(await pay(req.body.pin, req.body.qrCodeResult, req.body.amountTo, req.body.addressTo));
    } catch (err) {
        res.status(400).send(err.message);
    }
});
module.exports = router;