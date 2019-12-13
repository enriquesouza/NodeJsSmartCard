# NodeJsSmartCard
This is the NodeJs SmartCard

You must have Node v11.11.0 and NPM 6.13.1 installed

Download it

cd inside the folder you cloned it

run => npm install

Start the app running the cmd: 
node index.js

    => This cmd will start both web services

        The Web Service 1 is to create all secrets

        The Web Service 2 is SmartPay API. It is responsible to send the payments from your card.

With both services running you are now able to run locally the console that generates and encrypt your card based in your PIN.

This PIN is the same that will be used on SMART PAY APPs;

SMART PAY Server
    This is the API to decrypt the QRCode and broadcast the transaction

In order to test the payment you need to Scan your QRCode or use this test one:

    All Card URI are stored on your local folder.
        > console
            > generator
                > generated_cards
                    > card_0 -- It is just an example, because you can have many cards
                        > card_0.qrcode -- This is the file that have your CARD.

    You can copy the content of card_0.qrcode and paste on CURL 
        qrCodeResult: "smartcash: ______ "

    This is the PIN you must type on SmartPay devices;
        pin: 123456

    curl --header "Content-Type: application/json" \
        --request POST \
        --data '{"pin": "123456","qrCodeResult": "smartcash:SfuQ4fg5ARKaXoKsSD9BnxN4N7DubnqMEp?card=2a8771425c214abc53f82efc54c7c9e0c2f0926105777012193bd73b6e7ede81bcf61372888112e2bdb18c3a5f9b54ebc79209a6a65305255c5c829f9fc4248d","amountTo": 0.002,"addressTo": "SgPMhNeG16Ty6VaPSnAtxNJAQ2JRnhTGaQ"}' \
        http://localhost:8089/pay
