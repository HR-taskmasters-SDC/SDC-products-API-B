const express = require('express');
const router = require('./router.js');
const path = require('path');
const PORT =  3000;

const app = express();

app.use(express.json());
app.use('/', router);

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`listening on PORT ${PORT}...`);
});