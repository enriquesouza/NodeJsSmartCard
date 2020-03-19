require('dotenv').config();
const _ = require('lodash');
const encrypt = require('../../lib/encrypt');
const decrypt = require('../../lib/decrypt');
const transactionHelper = require('../../lib/transactionHelper');

async function getEncryptionSecret(pin, address) {
    
    let first = await eval(process.env.FIRST_ENCRYPTION_RULE)
    
    if (_.isUndefined(first) || _.isNull(first) || _.isEmpty(first)) {
        return null;
    }

    return decrypt(pin, process.env.CRYPTO_SECRET);
}

module.exports = getEncryptionSecret;