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

app.get('/', (req, res) => {
    res.send('Just a test API for Kong');
});

// list ads
app.get('/ad', (req, res) => {
    res.json(ads);
});

// Create ad
app.post('/ad', (req, res) => {
    const ad = req.body();
    ads.push(ad);
    res.json(ad)
});

// get ad by id
app.get('/ad/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ad = _.find(ads, (a) => {
        return a.id === id
    });
    res.json(ad)
});

app.listen(PORT, () => console.log(`Test API is ready and listening on http://localhost:${PORT}`));