require('dotenv').config()
const qrCode = require('qrcode-terminal');
const fs = require('fs');
const inquirer = require('inquirer');
const _ = require('lodash');

//Local lib
const encrypt = require('../../lib/encrypt')
const decrypt = require('../../lib/decrypt')
const getSecret = require('../../lib/secret')

const smartCashKeyGenerator = require('./lib/smartCashKeyGenerator')

async function getUserChoice() {
    try {

        let listOfCards = fs.readdirSync("./generated_cards");
        listOfCards.unshift("Create a new card");
        let choices = await inquirer
            .prompt([{
                type: 'list',
                name: 'choice',
                message: "What would you like to do? Create a new card or change an existing one?",
                choices: listOfCards
            }]);
        console.log(choices.choice);
        return choices.choice;
    } catch (err) {
        throw err;
    }
}

async function main() {

    let choice = await getUserChoice();

    if (choice == "Create a new card") choice = null;

    smartCashKeyGenerator.getFilesNames(choice);

    let keyPair = smartCashKeyGenerator.generateOrGetKeyPairAndSaveIt(choice);

    if (_.isNull(choice)) {
        console.log(keyPair);
        console.log();
        console.log("Your card was created. You now must validate it, so we can make sure you are not a robot.");
        console.log();
        console.log("Send 0.001 to validate the address:");
        console.log();
        qrCode.generate(`smartcash:${keyPair.address}?amount=0.001`, {
            small: true
        });
        console.log();
        console.log();

        return;
    }

    console.log('Your keys are create, now we need to create the card.')
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

        if (secret.password !== secret.passwordConfirmation)
            throw new Error(`Your password does not match. Restart the process to encrypt your card.`);

        let myEncryptedKey = await smartCashKeyGenerator.encryptKey(secret.password, keyPair);

        let cardURI = smartCashKeyGenerator.generateURICard(keyPair, myEncryptedKey);

        smartCashKeyGenerator.saveCardURI(cardURI);

        await smartCashKeyGenerator.createAndSavePngQrCode(cardURI);

        await smartCashKeyGenerator.createAndSaveHtmlQrCode(cardURI);

        qrCode.generate(cardURI, {
            small: true
        })
    }).catch(err => console.log(err.message));

}

main();