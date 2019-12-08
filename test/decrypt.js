const decrypt = require('./../lib/decrypt');
const getSecret = require('./../lib/secret')
const _ = require('lodash')

function testTryToDecryptWithoutTheSecret() {

    console.log('Starting test:  TRY TO DECRYPT WITHOUT SECRET')

    //SfuQ4fg5ARKaXoKsSD9BnxN4N7DubnqMEp
    //This test should fail
    try {

        let wrongPK = decrypt('5b444c1a8fa6dc1bc331561e7ddf9decccb298e4ae5008db118c50ad20bc9cd987e7b249f3e13ee1d81c2a7d994b8c5a0093cf579a14bab338f821d70aef7aac', "123456")

        let assert = _.isEqual(wrongPK, 'VNfTLEaiicXDZum2DxYiRNLoMHLbjGsE43DV5CEtVnq8rxdAP9bx');

        if (assert === true) {
            console.error('It should never decrypt without the external secret');
        } else {
            console.info('OK, the PK was not decrypted as expected');
        }
    } catch (err) {
        console.info('OK, the PK was not decrypted as expected =>' + err.message);
    }

}

async function testTryToDecryptWithTheSecret() {

    console.log('Starting test:  TRY TO DECRYPT WITH SECRET')

    let _password = "123456";
    let _secret = await getSecret("SfuQ4fg5ARKaXoKsSD9BnxN4N7DubnqMEp");
    let _key = _password + _secret;
    let _wif = "2a8771425c214abc53f82efc54c7c9e0c2f0926105777012193bd73b6e7ede81bcf61372888112e2bdb18c3a5f9b54ebc79209a6a65305255c5c829f9fc4248d";
    let _secretToMatch = "7edc737b39c92551d16263967de30ca5217a850fc1585444a8ea5f4591fd0b7ac1bf0744c8ab0fe28239ee1032e899ae10f17a2cffcb4973c08eda6ea60faa10f6f40e66ca39d407554b7a2b147a3106829f690fc2e955eedd99f23bf29adde837569983352737181cd8d5a1769faacd";
    let assertSecret = _.isEqual(_secret, _secretToMatch);

    console.log("---------------   ASSERT SECRET   ---------------")
    console.log("")
    console.log(`The secret is ${_secret}`);
    console.log("")
    if (assertSecret === true) {
        console.log("OK!!! The secret matches!")
    } else {
        console.error("ERROR!!! The secret does not match!")
    }
    console.log("")
    console.log("-------------------------------------------------")
    console.log("")
    console.log("")

    console.log("---------------   ASSERT PK   ---------------")
    console.log("")
    console.log("")
    //This test should pass
    let rightPK = decrypt(_wif, _key)

    console.log(`The PK is ${rightPK}`);
    console.log("");

    let assert = _.isEqual(rightPK, 'VNfTLEaiicXDZum2DxYiRNLoMHLbjGsE43DV5CEtVnq8rxdAP9bx');
    if (assert === true) {
        console.info('OK!!!! Decrypted successfully');
    } else {
        console.error('ERROR!!!, the PK was not decrypted as expected');
    }
    console.log("")
    console.log("-------------------------------------------------")
    console.log("")
    console.log("")
}

//testTryToDecryptWithoutTheSecret();
testTryToDecryptWithTheSecret();