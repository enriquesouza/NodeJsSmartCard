require('dotenv').config()

const qrCode = require('qrcode-terminal');
const smartCash = require('smartcashjs-lib')

const fs = require('fs');
const inquirer = require('inquirer');
const encrypt = require('./lib/encrypt')
const decrypt = require('./lib/decrypt')

const getSecret = require('./lib/secret')

const fileName = "wifPK.txt"

var wif = "";
var address = "";
var ecPair = null;

if (!fs.existsSync(fileName)) {

    ecPair = smartCash.ECPair.makeRandom();
    wif = ecPair.toWIF();
    address = ecPair.getAddress();

    fs.writeFileSync(fileName, address);
    fs.appendFileSync(fileName, "|" + wif.toString())

} else {

    let fileContent = fs.readFileSync(fileName).toString();
    let content = fileContent.toString().split('|');
    address = content[0];
    wif = content[1];

}
console.log(`Address: ${address}`);
qrCode.generate(address, {
    small: true
})
console.log(`Private key: ${wif}`)
qrCode.generate(wif, {
    small: true
})


inquirer
    .prompt([{
        type: 'confirm',
        name: 'hasPassword',
        message: "Would you like to encrypt your PK? ",
        default: "N"
    }])
    .then(answers => {
        // Logging out the secret defeats the purpose though ;)
        console.info('Would you like to encrypt your PK? ', answers.hasPassword);

        if (answers.hasPassword) {
            inquirer.prompt([{
                    type: 'password',
                    name: 'password',
                    message: 'Type your password',
                },
                {
                    type: 'password',
                    name: 'passwordConfirmation',
                    message: 'Type your password',
                }
            ]).then(async secret => {


                let _secret = await getSecret(address);

                console.log(`The secret to encrypt your key is: ${_secret}`);
                console.info('What is the password:', secret.password);
                console.info('What is the password confirmation:', secret.passwordConfirmation);

                if (secret.password === secret.passwordConfirmation) {
                    console.info('Does your password match?', true);
                    myEncryptedWif = encrypt(wif, secret.password + _secret);
                    console.log(myEncryptedWif);



                    console.log(`My encrypted key: ${myEncryptedWif}`)
                    qrCode.generate(myEncryptedWif, {
                        small: true
                    })
                    console.log(``)
                    console.log(``)
                    fs.writeFileSync("encrypted_wif", myEncryptedWif);
                    console.log(decrypt(myEncryptedWif, secret.password + _secret));
                }
            })
        }
    })