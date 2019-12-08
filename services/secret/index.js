require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const encryptionController = require('./controller');

const app = express();
const port = process.env.port || 8088;

app.use(bodyParser.json());

app.use("/api", encryptionController);

app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);

    console.log(`The server is running at http://localhost:${port}/api/crypto/asd`);

});
