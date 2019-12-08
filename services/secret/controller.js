const express = require('express')
const encryption = require('./encryption')
const router = express.Router();

router.get('/crypto/:address', async (req, res) => {

    try {
        let address = req.params.address;
        res.json(await encryption("", address));
    } catch (err) {
        res.status(400).send(err.message);
    }
    
});

module.exports = router;