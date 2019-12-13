require('dotenv').config();
const crypto = require('crypto');
const algorithm = process.env.CRYPTO_ALGO;
module.exports = function decrypt(textToDecrypt, secret) {
    const key = crypto.scryptSync(secret, 'salt', 32);
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(textToDecrypt, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}