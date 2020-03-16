require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cardController = require('./controller');
const app = express();
const https = require(`https`);
const http = require(`http`);
const httpPort = process.env.port || 8090;
const httpsPort = process.env.https_port || 8890;
const fs = require(`fs`);
//Global Dir
const path = require('path');
const appDir = path.resolve(__dirname);
//HTTPS
const privateKey = fs.readFileSync(`localhost.key`);
const certificate = fs.readFileSync(`localhost.crt`);
const credentials = {key: privateKey, cert: certificate};

app.use(bodyParser.json());
app.use("/card", cardController);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(httpPort, () => {
    console.log(`The server is running at http://localhost:${httpPort}`);
    console.log(`The server is running at http://localhost:${httpPort}/`);
    console.log(__dirname);
});
httpsServer.listen(httpsPort, () => {
    console.log(`The server is running at https://localhost:${httpsPort}`);
    console.log(`The server is running at https://localhost:${httpsPort}/`);
    console.log(__dirname);
});