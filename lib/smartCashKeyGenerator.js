const smartCash = require('smartcashjs-lib');

//Local lib
const encrypt = require('./encrypt')

function generateKey() {
    let ecPair = smartCash.ECPair.makeRandom();
    const pin = (Math.floor(100000 + Math.random() * 900000)).toString();
    const pinEncrypted = encrypt(pin, process.env.CRYPTO_SECRET);
    
    return {
        key: encrypt(ecPair.toWIF().toString(), pinEncrypted + process.env.CRYPTO_SECRET),
        address: ecPair.getAddress(),
        pin: pinEncrypted
    }
}

function generateURICard(keyPair) {

    return `smartcash:${keyPair.address}?card=${keyPair.key}&pin=${keyPair.pin}`

}

module.exports = {

    generateKey,
    generateURICard,
    
}