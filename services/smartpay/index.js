require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const payController = require('./controller');
const app = express();
const port = process.env.port || 8089;

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(bodyParser.json());
app.use("/", payController);
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});