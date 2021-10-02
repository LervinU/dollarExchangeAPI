'use strict';

const express = require('express');
const app = express();
var cors = require('cors')
const { saveToDB, scrapeTimeInterval } = require('./src/db/write'); 

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/dollar', require("./src/routes/prices.routes"));
app.use('/api/dollar/history', require("./src/routes/history.router"));


let refrestime = parseInt(process.env.refresTime);

setInterval(async function() {
    saveToDB();
}, refrestime);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

