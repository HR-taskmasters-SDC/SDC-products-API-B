const express = require('express');
const app = express();
const PORT =  3000;
const router = require('./router.js');
app.use(express.json());


app.use('/products', router);
app.use('/cart', router);


app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`listening on PORT ${PORT}...`);
})