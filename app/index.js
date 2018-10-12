const PORT = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();
app.use(bodyParser.json());


let ads = [
    {
        id: 123,
        headline: 'Some Awesome thing',
        caption: 'It\'s really cool'
    },
    {

        id: 1234,
        headline: 'Another Awesome thing',
        caption: 'This one either'
    },
];

let users = [
    {
        id: 321,
        name: 'John Doe',
        role: 'publisher'
    },
    {

        id: 543,
        headline: 'Jane Doe',
        caption: 'admin'
    },
];

app.get('/', (req, res) => {
    res.send('Just a test API for Kong');
});

/* Some abstract service endpoints*/

app.get('/ad-service', (req, res) => {
    res.json('I am sample Ad service API');
});

app.get('/ad-service/ads', (req, res) => {
    res.json(ads);
});

app.post('/ad-service/ads', (req, res) => {
    const ad = req.body();
    ads.push(ad);
    res.json(ad)
});

app.get('/ad-service/ads/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ad = _.find(ads, (a) => {
        return a.id === id
    });
    res.json(ad)
});

/* sample UI facing endpoints*/

app.get('/api', (req, res) => {
    res.json('I am sample UI facing API and you should be authorized!');
});

app.get('/api/user', (req, res) => {
    res.json(users);
});

app.post('/api/user', (req, res) => {
    //this should do a request body transformation on the KONG level
    res.json(req.body());
});

app.delete('/api/user', (req, res) => {
    //this one is ACL protected (admin role required)
    res.json(req.body());
});

app.listen(PORT, () => console.log(`Test API is ready and listening on http://localhost:${PORT}`));