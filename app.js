const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const storage = require('node-persist');
const scraper = require('./scraper'); 
const ListScraper = require('./ListScraper');
const helper = require('./helper');




// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//set view engine as ejs
app.set('view engine', 'ejs');

//what server will do in get request
app.get('/', (req, res ) => {


    //get dummyData to show in index
    let data = helper.DummyData;

    res.render ('index', {data: data,} );
 
});

app.get('/Options', (req, res ) => {


    //get dummyData to show in index
    let data = helper.DummyData;

    res.render ('options', {data: data,} );

});


//what server will do in post request
app.post ('/Play', (req, res) => {

    async function SaveCurrentDataAsync() {
        try {
        Currentdata = data;
        await storage.setItem ('Currentdata', Currentdata );
            console.log("anlık dosya kaydedildi");
        }catch{
            console.log("anlık dosya kaydedilemedi!");
        }
    }

    async function GetScrapeData() {

        try {
            //get scrapped data from storage if it is exist
            data = await storage.getItem('Scrapedata');
            console.log("Data has been taken from storage");
            // let max = 250;
            //get random movie data from randomer
            data = helper.RandomPicker(data);

            res.render ('index', {data: data,} );
            SaveCurrentDataAsync(data);
            }catch{
                console.log("Error while getting Scrapedata");
            }
    }
    GetScrapeData();
      
       
    // const url = 'tt0111161';

    
    //give url as movie id and get back movie details
    // scraper.getDetails(url)
    // .then((data)=>{
    //         //console.log(data);

            
    //         async function makeRequest() {
    //             await storage.init( /* options ... */ );
    //             await storage.setItem ('Currentdata', data );
    //             res.render ('index', {data: data,} );
    //           }

    //           makeRequest();



    // }).catch((err)=>{
    //     console.log(err);
    // });
});

app.post('/guess', urlencodedParser, function (req, res) {

    //catch post value and name it as score
    score = req.body.score;

    async function runFunction() {

        //gate data value from storage
        data = await storage.getItem('Currentdata');

        //check if score is same with data.rating
        helper.AnalyzeScore(score,data);

        //render page with sending data
        res.render ('index', {data: data,} );
    }

    //start async function
    runFunction();

});


app.post('/ListScraper', urlencodedParser, function (req, res) {

        url = req.body.url;

        //scrap movie id's from this url
        ListScraper(url, function(err, data) {
            console.log("Manuel Scrapper is Working");
            calistir(data);
          });
    
        //save scrapped data to storage
        function calistir(data){ 
            // var Scrapedata = data;
            async function ScrapData() {
                Scrapedata = data;
                await storage.init( /* options ... */ );
                await storage.setItem('Scrapedata',Scrapedata)
                res.redirect('/')
              }
        ScrapData();
        }
    
});


app.get('/getlink', urlencodedParser, function (req, res) {

   const url = 'tt0034583';

    //give url as movie id and get back movie details
    scraper.getDetails(url)
    .then((data)=>{
            //console.log(data);

            
            async function makeRequest() {
                await storage.init( /* options ... */ );
                await storage.setItem ('Currentdata', data );
                console.log(data);
                res.render ('index', {data: data,} );
              }

              makeRequest();

    }).catch((err)=>{
        console.log(err);
    });
    
});

//while server is working on 3000 port give message
app.listen(3000, () => {
    console.log('Express server is working')
});
