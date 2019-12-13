require('dotenv').config()
const qrCode = require('qrcode-terminal');
const smartCash = require('smartcashjs-lib')
const fs = require('fs');
const inquirer = require('inquirer');
const encrypt = require('./lib/encrypt')
const decrypt = require('./lib/decrypt')
const getSecret = require('./lib/secret')
const webQrCode = require('qrcode');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);
const _ = require('lodash');

async function startSmartPayService() {

    console.log("Starting SmartPay Service... ");
    const {
        stdout,
        stderr
    } = await execFile('node', ['./services/smartpay/index.js']);
    console.log(stdout);
    console.log(stderr);
}
startSmartPayService();

async function startSmartSecretService() {
    console.log("Starting Secret Generator Service... ");
    const {
        stdout,
        stderr,
    } = await execFile('node', ['./services/secret/index.js']);
    console.log(stdout);
    console.log(stderr);
}
startSmartSecretService();