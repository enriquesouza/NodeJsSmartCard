require('dotenv').config();
const encrypt = require('./lib/encrypt');
const decrypt = require('./lib/decrypt');
const format = require('string-format');
const getSecret = require('./lib/secretSync')
const vm = require('vm');
const sandbox = {
    secret: getSecret,
    secretResponse: function (error, response, body) {
        console.log('error:', error); 
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
    }
};
vm.createContext(sandbox);
const code = format(process.env.GET_SECRET, 'SfuQ4fg5ARKaXoKsSD9BnxN4N7DubnqMEp');
vm.runInContext(code, sandbox);
vm.runInThisContext