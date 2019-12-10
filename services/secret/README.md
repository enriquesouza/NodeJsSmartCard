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
        http://localhost:PORT/secret/ADDRESS

    We don't have access to your private KEY!