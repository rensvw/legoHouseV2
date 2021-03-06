'use strict';

if (process.env.NODE_ENV === 'production')
    require('newrelic');

const PORT = process.env.PORT || 8080;

import os from 'os';
import express from 'express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import RoutesConfig from './server/config/routes.conf';
import DBConfig from './server/config/db.conf';
import Routes from './server/routes/index';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import homeAutomation from './server/automation/automation'


const app = express();

const whitelist = ['http://localhost:4200', 'https://localhost:3333'];
const corsOptions = {
    origin: function(origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
    },
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

RoutesConfig.init(app);
DBConfig.init();
Routes.init(app, express.Router());
//app.use(helmet);
// listen to https instance of app
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors(corsOptions));


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const opts = {
    key: fs.readFileSync('./server/cert/privkey1.pem'),
    cert: fs.readFileSync('./server/cert/fullchain1.pem'),
    ca: fs.readFileSync("./server/cert/chain1.pem")
}

http.createServer(app)
    .listen(PORT, () => {
        homeAutomation.start();
        console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
        console.log(`enviroment: ${process.env.NODE_ENV}`);
    });