const express = require('express');
const app = express();

const port = process.env.PORT || 3000;


app.use(express.json());
app.use('/api/dollar', require("./src/routes/prices.routes"));

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

