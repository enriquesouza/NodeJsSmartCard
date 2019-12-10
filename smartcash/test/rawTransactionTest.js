require('dotenv').config();

const smartCash = require('smartcashjs-lib');
const rpc = require('../../rpc');
const request = require('request-promise');
const _ = require('lodash');

/*


rpc.command("sendrawtransaction", signedTx, false).then(rpcResult => {

    console.log(rpcResult)

}).catch(err => console.log(err.message));

//94e92a4db4f1d78228b553da17bd91d3315362d452f64bb9921b40639298d99e
*/

async function sendrawtransaction() {

    let to = "SgPMhNeG16Ty6VaPSnAtxNJAQ2JRnhTGaQ";
    let amount = 100000;
    let key = process.env.TEST_PK;

    createRawTransaction(to, amount, key);
}

async function createRawTransaction(toAddress, amount, keyString) {

    let key = smartCash.ECPair.fromWIF(keyString);

    let fromAddress = key.getAddress().toString();

    let transaction = new smartCash.TransactionBuilder();

    let listUnspent = await getUnspent(fromAddress);

    let totalUnspent = _.sumBy(listUnspent, 'amount');

    console.log(`Total Unspent ${totalUnspent}`)

    let countUnspent = listUnspent.length;

    console.log(`Count Unspent ${countUnspent}`)
    //SEND TO
    transaction.addOutput(toAddress, amount);

    for (let i = 0; i < countUnspent; i++) {

        let uxto = listUnspent[i];

        console.log(`${uxto.txid} - ${uxto.vout}`)

        //TODO: get the list of all UXTO
        transaction.addInput(uxto.txid, uxto.vout);

    }

    
    try {
        transaction.sign(0, key);
        let signedTransaction = transaction.build().toHex();
        console.log(signedTransaction)
    } catch (err) {
        console.error(err);
    }
}
/*
async function calculateFee(listUnspent, amount) {

    let fee = 0.001;

    let totalUnspent = _.sumBy(listUnspent, 'amount');

    let countUnspent = listUnspent.length;

    var newFee = (((countUnspent * 148) + (2 * 34) + 10 + 9) / 1024) * fee;

    newFee = (0.00003 + (((countUnspent * 148) + (2 * 34) + 10 + 9) / 1024)) * fee;

    if (newFee > fee)
        fee = newFee;

    fee = roundUp(fee, 4);

    let change = (totalUnspent - amount - fee);
}

function roundUp(num, precision) {
    precision = Math.pow(10, precision)
    return Math.ceil(num * precision) / precision
}
*/

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

sendrawtransaction().then(r => console.log(r)).catch(e => console.log(e))