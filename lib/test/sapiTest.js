const createAndSendRawTransaction = require('./../sapi');

async function createAndSendRawTransactionTest() {

    let to = "SgPMhNeG16Ty6VaPSnAtxNJAQ2JRnhTGaQ";
    let amount = 0.002;
    let key = process.env.TEST_PK;

    console.log(key)

    return await createAndSendRawTransaction(to, amount, key);
}

createAndSendRawTransactionTest().then(txId => {
    //We expect a transaction id from blockchain
    console.log(txId);
}).catch(err => console.log(err.message));