const express = require('express');
const app = express();
const scraper = require('./scraper'); 

const url = 'tt3659388';


scraper.getDetails(url).then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
});

app.set('view engine', 'ejs');


app.get('/', (req, res ) => {
    res.render ('index', );

 });


app.post ('/', (req, res) => {
    res.send("Post isteği gönderildi");
});





app.listen(3000, () => {
    console.log('express server is working')

});

