const express = require('express');
const fs = require ('fs');

const app = express();

app.get('/', (req, res ) => {
    res.send ('merhaba');

});

app.listen(3000, () => {
    console.log('express server is working')

});