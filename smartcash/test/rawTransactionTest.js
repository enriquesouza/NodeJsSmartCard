require('dotenv').config();

const smartCash = require('smartcashjs-lib');
const rpc = require('../../rpc');
const request = require('request-promise');
const _ = require('lodash');
const convert = require('../../lib/units')

async function sendrawtransaction() {

    let to = "SgPMhNeG16Ty6VaPSnAtxNJAQ2JRnhTGaQ";
    let amount = 0.002;
    let key = process.env.TEST_PK;

    createRawTransaction(to, amount, key);
}

async function createRawTransaction(toAddress, amount, keyString) {

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

    let change = (totalUnspent - amount - fee);

    console.log(`change ${change}`)

    let amountWithFee = amount + fee;

    console.log(`amountWithFee ${amountWithFee}`)

    //Change TO
    transaction.addOutput(fromAddress, roundUp(change * satoshi, 4));

    let data = new Buffer("smartPay");
    let ret = smartCash.script.compile(
        [
            smartCash.opcodes.OP_RETURN,
            data
        ])

    transaction.addOutput(ret, 0)

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

        let txid =  await sendTransaction(signedTransaction)

        console.log(txid)

        return txid

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
    let url = `https://insight.smartcash.cc/api/addr/${address}/utxo`;
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
        uri: 'http://sapi.dustinface.me/v1/transaction/send',
        body: {
            data: `${hex}`,
            instantpay:false,
            overrideFees:false
        },
        json: true // Automatically stringifies the body to JSON
    };

    try {
        return await request.post(options);
    } catch (err) {
        throw err;
    }
}

sendrawtransaction().then(r => console.log(r)).catch(e => console.log(e))