require('dotenv').config()
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

async function startSmartPayService() {

    console.log("Starting SmartPay Service... ");
    const {
        stdout,
        stderr
    } = await execFile('node', ['./services/smartpay/index.js']);
    console.log(stdout);
    console.log(stderr);
}

async function startSmartSecretService() {
    console.log("Starting Secret Generator Service... ");
    const {
        stdout,
        stderr,
    } = await execFile('node', ['./services/secret/index.js']);
    console.log(stdout);
    console.log(stderr);
}

startSmartPayService();
startSmartSecretService();