const Client = require('bitcoin-core');

require('dotenv').config()

const client = new Client({
    network: process.env.RPC_NETWORK,
    username: process.env.RPC_USER,
    password: process.env.RPC_PASS,
    port: process.env.RPC_PORT,
    host: process.env.RPC_HOST
});
module.exports = client;