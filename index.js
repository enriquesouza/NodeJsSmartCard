require('dotenv').config()
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

async function startSmartSecretService() {
    console.log("Starting Secret Generator Service... http://localhost:8088 & https://localhost:8888");
    console.log(__dirname);
    const {
        stdout,
        stderr,
    } = await execFile('node', ['./services/secret/index.js']);
    console.log(stdout);
    console.log(stderr);

}

async function startSmartPayService() {

    console.log("Starting SmartPay Service... http://localhost:8089 & https://localhost:8889");
    console.log(__dirname);
    const {
        stdout,
        stderr
    } = await execFile('node', ['./services/smartpay/index.js']);
    console.log(stdout);
    console.log(stderr);

}

async function startCardService() {
    console.log("Starting Card Generator Service... http://localhost:8090 & https://localhost:8890");
    console.log(__dirname);
    const {
        stdout,
        stderr,
    } = await execFile('node', ['./services/card/index.js']);
    console.log(stdout);
    console.log(stderr);

}

startSmartSecretService();
startSmartPayService();
startCardService();
