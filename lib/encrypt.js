require('dotenv').config()
const crypto = require('crypto');
const algorithm = process.env.CRYPTO_ALGO;

module.exports = function encrypt(textToEncrypt, secret) {
    const key = crypto.scryptSync(secret, 'salt', 32);
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(textToEncrypt, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted
}