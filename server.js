const express = require('express');
const fs = require('fs');
const https = require('https');

const app = express();
app.use(express.static('public'));
app.use('/msal', express.static('node_modules/msal/dist'));
app.use('/materialize', express.static('node_modules/materialize-css/dist'));

const key = fs.readFileSync('localhost.key', 'utf8');
const cert = fs.readFileSync('localhost.crt', 'utf8');
const server = https.createServer({ key, cert }, app);
server.listen(1337, () => process.stdout.write('Listening at https://localhost:1337'));
