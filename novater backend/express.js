const express = require('express');
const app = express();
const https = require('https');
const url = 'https://assignments.novater.com/v1/bus/schedule';
const cors = require('cors');

app.use(cors());

let data = '';

let ReactData = '';

const username = 'kerdo';
const password = 'd45eafceb37814fe73a8d0613bf19cea';

const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

https.get(url, {headers: {Authorization: auth}}, (resp) => {

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        ReactData = data;
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});

app.get('/v1/bus/schedule', (req, res) => {
    res.send(ReactData);
});

app.listen('3307', () => {
    console.log('Server started on port 3307');
});