const _ = require('lodash');
const webQrCode = require('qrcode');
const fs = require('fs');
const smartCash = require('smartcashjs-lib');

//Local lib
const encrypt = require('../../../lib/encrypt')
const getSecret = require('../../../lib/secret')

let listOfCards = fs.readdirSync("./generated_cards");

//folder
let folder = `./generated_cards/card_${listOfCards.length}`;

//To create the file name without extension
let keyFilePrefixName = `${folder}/card_${listOfCards.length}`

let openKeyFile = `${folder}/card_${listOfCards.length}.key`;
let htmlKeyFile = `${folder}/card_${listOfCards.length}.html`;
let png = `${folder}/card_${listOfCards.length}.png`;
let qrCodeKeyFile = `${folder}/card_${listOfCards.length}.qrcode`;
let encryptedKeyFile = `${folder}/card_${listOfCards.length}.eckey`;


function getFilesNames(existentFolder = null) {

    if (!_.isUndefined(existentFolder) && !_.isNull(existentFolder) && !_.isEmpty(existentFolder)) {

        folder = `./generated_cards/${existentFolder}`;
        keyFilePrefixName = `${folder}/${existentFolder}`
        openKeyFile = `${folder}/${existentFolder}.key`;
        htmlKeyFile = `${folder}/${existentFolder}.html`;
        png = `${folder}/${existentFolder}.png`;
        qrCodeKeyFile = `${folder}/${existentFolder}.qrcode`;
        encryptedKeyFile = `${folder}/${existentFolder}.eckey`;
    }

}

function printFilesNames(){

    console.log(folder);
    console.log(keyFilePrefixName);
    console.log(openKeyFile);
    console.log(htmlKeyFile);
    console.log(png);
    console.log(qrCodeKeyFile);
    console.log(encryptedKeyFile);

}

function generateOrGetKeyPairAndSaveIt(existentFolder = null) {

    let keyPair = {
        key: null,
        address: null
    }

    if (!_.isUndefined(existentFolder) && !_.isNull(existentFolder) && !_.isEmpty(existentFolder)) {

        getFilesNames(existentFolder);

    } else {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
    }

    if (!fs.existsSync(openKeyFile)) {

        keyPair = generateKey();
        saveKeyPairToNonEncryptedFile(openKeyFile, keyPair);

    } else {

        keyPair = getExistentKeyFromFile(openKeyFile);

    }

    return keyPair;
}

function saveKeyPairToNonEncryptedFile(openKeyFile, keyPair) {

    fs.writeFileSync(openKeyFile, keyPair.address + "|" + keyPair.key);

}

function saveKeyToAnEncryptedFile(encryptedKeyFile, encryptedKey) {

    fs.writeFileSync(encryptedKeyFile, encryptedKey);

}

function generateKey() {

    let ecPair = smartCash.ECPair.makeRandom();
    return {
        key: ecPair.toWIF().toString(),
        address: ecPair.getAddress()
    }

}

function getExistentKeyFromFile(openKeyFile) {

    let fileContent = fs.readFileSync(openKeyFile).toString();
    let content = fileContent.toString().split('|');
    let _address = content[0];
    let _wif = content[1];

    return {
        key: _wif,
        address: _address
    }

}

async function encryptKey(_password, keyPair) {

    let _secret = await getSecret(_password, keyPair.address);

    let encryptedKey = encrypt(keyPair.key, _password + _secret);

    saveKeyToAnEncryptedFile(encryptedKeyFile, encryptedKey)

    return encryptedKey;

}

function generateURICard(keyPair, encryptedKey) {

    return `smartcash:${keyPair.address}?card=${encryptedKey}`

}

function saveCardURI(cardURI) {

    fs.writeFileSync(keyFilePrefixName + '.qrcode', cardURI);

}

async function createAndSavePngQrCode(cardURI) {

    await webQrCode.toFile(keyFilePrefixName + '.png', cardURI);

}

async function createAndSaveHtmlQrCode(cardURI) {

    const res = await webQrCode.toDataURL(cardURI);
    fs.writeFileSync(keyFilePrefixName + '.html', `<img src="${res}">`);

}

module.exports = {

    printFilesNames,
    getFilesNames,
    generateOrGetKeyPairAndSaveIt,
    saveKeyPairToNonEncryptedFile,
    saveKeyToAnEncryptedFile,
    generateKey,
    getExistentKeyFromFile,
    encryptKey,
    generateURICard,
    createAndSavePngQrCode,
    createAndSaveHtmlQrCode,
    saveCardURI

}