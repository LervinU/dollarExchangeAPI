'use strict';

const express = require('express');
const app = express();
const { saveToDB, scrapeTimeInterval } = require('./src/db/write'); 

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/dollar', require("./src/routes/prices.routes"));

setInterval(async function() {
    saveToDB();
}, scrapeTimeInterval);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

