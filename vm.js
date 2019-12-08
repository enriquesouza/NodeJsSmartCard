require('dotenv').config()
const encrypt = require('./lib/encrypt')
const decrypt = require('./lib/decrypt')
const format = require('string-format')
const getSecret = require('./lib/secret2')
const vm = require('vm');

const sandbox = {
    secret: getSecret,
    secretResponse: function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    }
};
vm.createContext(sandbox); // Contextify the sandbox.
const code = format(process.env.GET_SECRET, 'SfuQ4fg5ARKaXoKsSD9BnxN4N7DubnqMEp');
vm.runInContext(code, sandbox);
vm.runInThisContext