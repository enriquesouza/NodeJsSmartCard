# NodeJsSmartCard
This is the NodeJs SmartCard

You must have Node v11.11.0 and NPM 6.13.1 installed

Download it

cd inside the folder you cloned it

run => npm install

open 2 terminals => 
    on terminal 1 => cd inside the root folder you cloned the repo then 
        run => node ./services/secret/

        This will start the service that creates the secret

    on terminal 2 => cd inside the root folder you cloned the repo then 

        run => node index.js 


SMART PAY Server
    This is the API to decrypt the QRCode and broadcast the transaction

    To start go to your root folder and type:
        node ./services/smartpay/index.js 


In order to test the payment you need to Scan your QRCode or use this test one:

    curl --header "Content-Type: application/json" \
        --request POST \
        --data '{"pin": "123456","qrCodeResult": "smartcash:SfuQ4fg5ARKaXoKsSD9BnxN4N7DubnqMEp?card=2a8771425c214abc53f82efc54c7c9e0c2f0926105777012193bd73b6e7ede81bcf61372888112e2bdb18c3a5f9b54ebc79209a6a65305255c5c829f9fc4248d","amountTo": 0.002,"addressTo": "SgPMhNeG16Ty6VaPSnAtxNJAQ2JRnhTGaQ"}' \
        http://localhost:8089/pay