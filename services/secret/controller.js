const express = require('express');
const encryption = require('./encryption');
const router = express.Router();
router.post('/secret', async (req, res) => {
    try {
        res.json(await encryption(req.body.pin, req.body.address));
    } catch (err) {
        res.status(400).send(err.message);
    }
});
module.exports = router;