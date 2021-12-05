const fs = require('fs');
const https = require('https');
const http = require('http');
const url = require('url');
const rewriteNewToken = require('./updateToken').rewriteNewToken;
const config = require('./config');
const errors = require('./errors');

let legend = {
    'leads': config.leadsWithContacts,
    'contacts': config.contacts,
    'users': config.users,
    'pipelines': config.pipelines
};

async function isTokenValid(fileName) {
    let stat = await fs.promises.stat(fileName);
    let day = 1000 * 60 * 60 * 23;  // one hour before update token, total 23 h in ms

    if (stat.mtimeMs + day  > Date.now()) {
        return true;
    } else {
        return false;
    }
}

(async () => {
    let tokenStatus = await isTokenValid('./tokens2.json');
    console.log(tokenStatus, 'last');
    if (!tokenStatus) {
        rewriteNewToken();
    }
})();

let tokens = fs.readFileSync('./tokens2.json');
let accessToken = JSON.parse(tokens)['access_token'];

const headers = {
	'Content-Type': 'application/json',
	'Authorization': `Bearer ${accessToken}`
};

let pipelineID = async () => {
    let res = await get(config.pipelines, headers);
    return res['_embedded'].pipelines[0].id;
}

async function statusesID2(leads) {
    let id = await pipelineID();
    let statusesId = leads.map(lead => lead['status_id']);
    let path = `${config.pipelines}/${id}/statuses/`;

    return Promise.all(statusesId.map(statusId => get(`${path}${statusId}`, headers)));
}

async function get(url, headers) {
    const f3 = () => {
        return new Promise((resolve, reject) => {
            const req = https.get(url, {'headers': headers}, (res) => {
                console.log(url);
                let buffer = [];

                res.on('data', data => {
                    buffer.push(data);
                });

                res.on('end', () => {
                    let str = buffer.join('');
                    console.log('ok');

                    let obj = {};

                    try {
                        obj = JSON.parse(str);
                    } catch (e) {
                        console.log(4);
                        console.log(e);
                    }
                    resolve(obj);
                });

                res.on('error', e => {
                    console.log(2);
                    reject(e);
                })
        
            });

            req.on('error', e => {
                console.log(e);
                console.log(1);
                reject(e);
            });
        })
    }
 
    let result = await f3().catch(console.log);

    return result;
}

function parseData(data, key) {
    let array = data['_embedded'][key];

    return array;
}

async function getAll2(legend, headers) {
    let obj = {};

    let keys = Object.keys(legend);
///    console.log(keys);

    let datas = Promise.all(keys.map(key => get(legend[key], headers)));
    let result = await datas;

    result.forEach((k, index) => {
        let key = keys[index];
///        console.log(key, 'key');
        obj[key] = parseData(k, key);
    })

    return obj;
}

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf8')
    console.log(req.url);

    if (req.method == 'GET' && req.url == '/api/data') {

        sendData(res, legend);

    } else {
        let urlParsed = url.parse(req.url, true);
        console.log(urlParsed);
        if (urlParsed.pathname == '/api/data' && urlParsed.query.query) {
            
            let leadsWithQuery = config.leads + '?with=contacts&query=' + urlParsed.query.query;
            console.log(leadsWithQuery);

            let legendQuery = Object.assign({}, legend);
            legendQuery.leads = leadsWithQuery;

            sendData(res, legendQuery);
        } else {
            let e = new errors.HttpError(403, 'forbidden');
            res.end(e.toString());
        }
    }
})

server.listen(8000, () => {
    console.log('server listening', 8000);
})

function formatData(obj) {
    let data = [];

    for (let i = 0; i < obj.leads.length; i++) {
        let leadObj = obj.leads[i];
///        console.log(leadObj)

        let userObj = obj.users.filter(user => user.id == leadObj['responsible_user_id'])[0];
        let contactID = leadObj['_embedded']['contacts'][0]['id'];
        let contactObj = obj.contacts.filter(contact => contact.id == contactID)[0];
        let customValues = contactObj['custom_fields_values'];

        let phone = '';
        let mail = '';

        for (let j = 0; j < customValues.length; j++) {
            let field = customValues[j];

            if (field['field_code'] == 'PHONE') {
                phone = field.values[0].value
            } 
            if (field['field_code'] == 'EMAIL') {
                mail = field.values[0].value;
            }
        }

        let tags = leadObj['_embedded']['tags'].map(tag => tag.name);
        let contact = {name: contactObj.name, mail, phone};
        let lead = {
            title: leadObj.name, 
            price: leadObj.price, 
            contact, 
            user: userObj.name, 
            createdAt: leadObj['created_at'],
            tags
        };

        data.push(lead);
    }

///    console.log(data);

    return data;
}

async function sendData(res, legend) {
    let result = [];

    try {
        let allLeads = await getAll2(legend, headers);

        let leadsStatuses = await statusesID2(allLeads.leads);
        let leadsStatusesObjs = leadsStatuses.map(status => {
            return { name: status.name, color: status.color }
        });

///        console.log(allLeads)
        let formatted = formatData(allLeads);
        let mixed = formatted.map((obj, index) => {
            obj['statusName'] = leadsStatusesObjs[index].name
            obj['statusColor'] = leadsStatusesObjs[index].color
            return obj;
        });

        result = JSON.stringify(mixed);
    } catch (e) {
        console.log(e);
        result = new errors.HttpError(500).toString();
    } finally {
///        res.end(JSON.stringify(result));
        res.end(result);
    }
}
