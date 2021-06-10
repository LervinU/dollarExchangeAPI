'use strict';

const express = require('express');
const app = express();
const { saveToDB, scrapeTimeInterval } = require('./src/db/write'); 

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/dollar', require("./src/routes/prices.routes"));


let refrestime = parseInt(process.env.refresTime);

setInterval(async function() {
    saveToDB();
}, refrestime);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

