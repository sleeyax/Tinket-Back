const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');

require('dotenv').config();

global.moment = require('moment');
moment.locale('nl-be');

const { version: currentVersion } = require('../package.json');

const app = express();
const router = require('./routes');
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static('public'));

app.use(router);

app.get('/', function (req, res) {
    res.send(`API Version: ${ currentVersion }`);
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');
        app.listen(port, () => {
            console.log(`Listening on http://127.0.0.1:${port}`);
        });
    })
    .catch((err) => console.error(`Failed to connect to database. Error: ` + err));
