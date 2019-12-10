require('dotenv').config();
const crypto = require('crypto');
const algorithm = process.env.CRYPTO_ALGO;
module.exports = function decrypt(textToDecrypt, secret) {
    let myKeyToDecrypt = crypto.createDecipher(algorithm, secret);
    let myStringToDecrypt = myKeyToDecrypt.update(textToDecrypt, 'hex', 'utf8')
    myStringToDecrypt += myKeyToDecrypt.final('utf8');
    return myStringToDecrypt;
}