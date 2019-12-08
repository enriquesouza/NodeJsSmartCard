require('dotenv').config()
const crypto = require('crypto');
const algorithm = process.env.CRYPTO_ALGO;

module.exports = function encrypt(textToEncrypt, secret) {
    let myKeyToEncrypt = crypto.createCipher(algorithm, secret);
    let myEncryptedWif = myKeyToEncrypt.update(textToEncrypt, 'utf8', 'hex');
    myEncryptedWif += myKeyToEncrypt.final('hex');
    return myEncryptedWif;
}
