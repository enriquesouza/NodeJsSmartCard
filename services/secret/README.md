Services > Secret

This service is to create a secret KEY remotely

It does use 
    ../../lib/encrypt.js
    ../../lib/decrypt.js

Express service:
    We create an express service HTTP to export the SECRET over the internet to the client

    The default PORT is 8088, but it can be set on .ENV file or
    exported in the shell console

    The default path should be:
        http://localhost:PORT/secret

    We don't have access to your private KEY!



    curl --header "Content-Type: application/json" \
        --request POST \
        --data '{"pin": "123456", "address":"SgPMhNeG16Ty6VaPSnAtxNJAQ2JRnhTGaQ"}' \
        http://64.34.219.31:8080/secret