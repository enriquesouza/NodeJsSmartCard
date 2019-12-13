require('dotenv').config();
const request = require('request-promise');
const body = require('body-parser');
const _ = require('lodash');
const format = require('string-format')
body.json();

async function getTransactionFromAPI(address) {
    let transactionResponse = null;
    try {
        transactionResponse = await request.get(format(process.env.URL_GET_ADDRESS_WITH_TX, address), {
            json: true
        });
    } catch (err) {
        throw err;
    }
    return transactionResponse;
}

async function getFirstTransactionFromAPI(address) {
    let transactionResponse = await getTransactionFromAPI(address);
    let first = await getFirstTransaction(transactionResponse);
    return first;
}

async function getFirstTransaction(result) {
    try {
        let txs = result.txs;
        let first = null;
        if ((_.isUndefined(result) || _.isUndefined(result.txs)) || _.isEmpty(result.txs)) {
            throw new Error("This card was not validated. You must send 0.001 SMART in order to validate it");
        } else if (result.txs.length == 1) {
            first = result.txs[0];
        } else {
            first = _.head(_.sortBy(txs, ['time']));
        }
        return first;
    } catch (err) {
        throw err;
    }
}

module.exports = getFirstTransactionFromAPI;