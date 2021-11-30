const fs = require('fs');
const https = require('https');

function rewriteNewToken() {
    const path = '/oauth2/access_token/';
    const link = 'https://example.org';
    const domain2 = '';

    const tokens = fs.readFileSync('./tokens2.json');
    const refresh_token = JSON.parse(tokens)['refresh_token'];

    const data = {
        'client_id': '',
        'client_secret': '',
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'redirect_uri': link
    };

    const options = {
        hostname: domain2,
        port: 443,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const req = https.request(options, (res) => {
        console.log('status code', res.statusCode);
        console.log('headers', res.headers);

        let buffer = [];

        res.on('data', data => {
            buffer.push(data);
        });

        res.on('end', () => {
            let str = buffer.join('');

            if (res.statusCode == 200) {
                fs.writeFileSync('./tokens2.json', str);
            }
        });

        res.on('error', () => {
            console.log(10);
        })

    })

    req.on('error', e => {
        console.log(11);
        console.log(e);
    })

    req.write(JSON.stringify(data));
    req.end();
}

module.exports = rewriteNewToken;