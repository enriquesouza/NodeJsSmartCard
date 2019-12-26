require('dotenv').config();
const smartCash = require('smartcashjs-lib');
const request = require('request-promise');
const _ = require('lodash');
let getSapiUrl = require('./poolSapi');

module.exports = async function createAndSendRawTransaction(toAddress, amount, keyString) {

    let satoshi = 100000000;

    let amountSat = satoshi * amount;

    let key = smartCash.ECPair.fromWIF(keyString);

    let fromAddress = key.getAddress().toString();

    let transaction = new smartCash.TransactionBuilder();

    let listUnspent = await getUnspent(fromAddress);

    let totalUnspent = _.sumBy(listUnspent, 'amount');

    console.log(`Total Unspent ${totalUnspent}`)

    let fee = calculateFee(listUnspent);

    console.log(`Fee ${fee}`)

    let countUnspent = listUnspent.length;

    console.log(`Count Unspent ${countUnspent}`)
    //SEND TO
    transaction.addOutput(toAddress, amountSat);

    let amountWithFee = amount + fee;

    let change = (totalUnspent - amountWithFee);

    console.log(`change ${change}`)

    console.log(`amountWithFee ${amountWithFee}`)

    //Change TO
    transaction.addOutput(fromAddress, roundUp(change * satoshi, 4));

 /*
    const data = Buffer.from('Programmable money FTW!', 'utf8')
    const embed = smartCash.payments.embed({data: [data]});
    let data = new Buffer("smartPay");
    let ret = smartCash.script.compile(
        [
            smartCash.opcodes.OP_RETURN,
            data
        ])

    transaction.addOutput(ret, 0)

    */

    let bigInputs = _.find(listUnspent, function (o) {
        return o.amount >= amountWithFee;
    });

    console.log(`bigInputs ${JSON.stringify(bigInputs)}`)

    let uxto = null;

    if (!_.isUndefined(bigInputs) && _.isArray(bigInputs)) {

        uxto = _.first(bigInputs);

        console.log(`uxto ${JSON.stringify(uxto)}`);
    } else {
        if (!_.isUndefined(bigInputs)) {
            uxto = bigInputs;
            console.log(`uxto ${JSON.stringify(uxto)}`);
        }
    }

    transaction.addInput(uxto.txid, uxto.vout);

    try {
        transaction.sign(0, key);

        let signedTransaction = transaction.build().toHex();

        console.log(signedTransaction)

        let txid = await sendTransaction(signedTransaction)

        console.log(txid)

        return txid;

    } catch (err) {
        console.error(err);
        throw err;
    }
}

function calculateFee(listUnspent) {

    let fee = 0.002;

    let countUnspent = listUnspent.length;

    var newFee = (((countUnspent * 148) + (2 * 34) + 10 + 9) / 1024) * fee;

    newFee = (0.00003 + (((countUnspent * 148) + (2 * 34) + 10 + 9) / 1024)) * fee;

    if (newFee > fee)
        fee = newFee;

    return roundUp(fee, 4);
}

function roundUp(num, precision) {
    precision = Math.pow(10, precision)
    return Math.ceil(num * precision) / precision
}

async function getUnspent(address) {
    let url = `http://insight.smartcash.cc/api/addr/${address}/utxo`;
    try {
        return await request.get(url, {
            json: true
        });
    } catch (err) {
        throw err;
    }
}

async function sendTransaction(hex) {
    var options = {
        method: 'POST',
        uri: getSapiUrl() + 'transaction/send',
        body: {
            data: `${hex}`,
            instantpay: false,
            overrideFees: false
        },
        json: true // Automatically stringifies the body to JSON
    };

    try {
        return await request.post(options);
    } catch (err) {
        throw err;
    }
}