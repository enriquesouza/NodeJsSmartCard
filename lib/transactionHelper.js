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

module.exports = getFirstTransactionFromAPI;