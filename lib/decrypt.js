require('dotenv').config()
const crypto = require('crypto');
const algorithm = process.env.CRYPTO_ALGO;

//const textToDecrypt = 'b302b2393aeb023f9603ecc67a3271d1043efe5745975f64d3fe2d16d462fe0bdd763cb87db54a0a10f7aceda49d5255110256e3fd331c666d46c3e1b5cf7744'

module.exports = function decrypt(textToDecrypt, secret) {
    let myKeyToDecrypt = crypto.createDecipher(algorithm, secret);
    let myStringToDecrypt = myKeyToDecrypt.update(textToDecrypt, 'hex', 'utf8')
    myStringToDecrypt += myKeyToDecrypt.final('utf8');
    return myStringToDecrypt;
}

//console.log(decrypt(textToDecrypt, "enrique"));