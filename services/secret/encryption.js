const request = require('request-promise');
const body = require('body-parser');
const _ = require('lodash')
const encrypt = require('../../lib/encrypt')
body.json();

async function getTransactionFromAPI(address) {

    let transactionResponse = null;

    try {
        //let address = `SfuQ4fg5ARKaXoKsSD9BnxN4N7DubnqMEp`;
        transactionResponse = await request.get(`https://insight.smartcash.cc/api/txs?address=${address}&pageNum=0`, {
            json: true
        });
    } catch (err) {
        console.log(err.message);
    }

    return transactionResponse;
}

async function getFirstTransactionFromAPI(address) {

    let transactionResponse = await getTransactionFromAPI(address);

    let first = await getFirstTransaction(transactionResponse);

    return first;

}

async function getFirstTransaction(result) {

    let txs = result.txs;
    let first = null;

    if ((_.isUndefined(result) || _.isUndefined(result.txs)) || _.isEmpty(result.txs)) {
        console.log("There are no results");
    } else if (result.txs.length == 1) {
        first = result.txs[0];
    } else {
        first = _.head(_.sortBy(txs, ['time']));
    }

    return first;

}

async function getEncryptionSecret(pin, address) {
    let first = await getFirstTransactionFromAPI(address);
    if (_.isUndefined(first) || _.isNull(first) || _.isEmpty(first)) {
        return null;
    } else {

        console.log(`address: ${address}`)

        console.log(`tx: ${first.txid}`)

        console.log(`time: ${first.time}`)

        console.log(`pin: ${pin}`)

        let encryptionKey = address + first.txid + first.time + pin;

        let encryptedSecret = encrypt(encryptionKey, "");

        console.log(`encryptedSecret: ${encryptedSecret}`)

        return encryptedSecret;
    }
}

module.exports = getEncryptionSecret;

/*
_.each(transactionResponse.txs, tx => {
    console.log(tx.txid);
    console.log(new Date(tx.time * 1000));
});
*/