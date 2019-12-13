const decrypt = require('../decrypt');
const getSecret = require('../secret')
const _ = require('lodash')

async function testTryToDecryptWithTheSecret() {

    console.log('Starting test:  TRY TO DECRYPT WITH SECRET')

    let _pin = "123456";
    let _secret = await getSecret(_pin, "SfuQ4fg5ARKaXoKsSD9BnxN4N7DubnqMEp");
    let _key = _pin + _secret;
    let _wif = "361a39fa25bec4e813771fe7c592697a41c6211f24cfd874000d92683ad7570ebb4ad1c8f878e7ec19e98a564af6649e8c95d66ccae6a8614a28c6f6f4763bdf";
    let _secretToMatch = "7edc737b39c92551d16263967de30ca5217a850fc1585444a8ea5f4591fd0b7ac1bf0744c8ab0fe28239ee1032e899ae10f17a2cffcb4973c08eda6ea60faa10f6f40e66ca39d407554b7a2b147a3106829f690fc2e955eedd99f23bf29adde89e8aa0a08b8a9c3a2bbc586c0bcc49ebd764ee061113af9f8f5183f3bab8b996";
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

testTryToDecryptWithTheSecret();