const express = require('express');
const router = require('./router.js');
const path = require('path');
const PORT =  3000;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/api', router);

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`listening on PORT ${PORT}...`);
});