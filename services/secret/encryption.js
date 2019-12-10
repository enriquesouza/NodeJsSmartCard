require('dotenv').config();
const _ = require('lodash');
const encrypt = require('../../lib/encrypt');
const transactionHelper = require('../../lib/transactionHelper');
async function getEncryptionSecret(pin, address) {
    let first = await eval(process.env.FIRST_ENCRYPTION_RULE)
    if (_.isUndefined(first) || _.isNull(first) || _.isEmpty(first)) {
        return null;
    } else {
        let encryptedSecret = eval(process.env.SECOND_ENCRYPTION_RULE);
        console.log(`encryptedSecret: ${encryptedSecret}`)
        return encryptedSecret;
    }
}
module.exports = getEncryptionSecret;