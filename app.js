const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const storage = require('node-persist');
const scraper = require('./scraper'); 
const ListScraper = require('./ListScraper');
const helper = require('./helper');
var http = require('http').createServer(app);
var io = require('socket.io')(http);




// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//set view engine as ejs
app.set('view engine', 'ejs');

app.get('/', (req, res ) => {


    //get dummyData to show first time
    let data = helper.DummyData;

    res.sendFile(__dirname + "/Assest/" + "index.html");

 
});

io.on('connection', function(socket){

    let data = helper.DummyData;


    socket.emit('news', data);
    socket.on('my other event', function(data) {
        console.log(data);
    });



    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

app.get('/Options', (req, res ) => {


    //get dummyData to show fist time
    let data = helper.DummyData;

    res.render ('options', {data: data,} );

});

app.get('/Play', (req, res ) => {


    //get dummyData to show fist time
    let data = helper.DummyData;

    res.render ('play', {data: data,} );

});


app.post ('/Play', (req, res) => {

    async function SaveCurrentDataAsync() {
        try {
        // Currentdata = data;
        await storage.setItem ('Currentdata', data );
            console.log("Currentdata have been saved");
        }catch{
            console.log("Currentdata have not been saved!");
        }
    }

    async function GetScrapeData() {

        try {
            //get scrapped data from storage if it is exist
            data = await storage.getItem('Scrapedata');
            console.log("Data has been taken from storage");
            //get random movie data from randomer
            data = helper.RandomPicker(data);

            res.render ('play', {data: data,} );
            SaveCurrentDataAsync(data);
            }catch{
                console.log("Error while getting Scrapedata");
            }
    }
    GetScrapeData();
 
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
        res.render ('play', {data: data,} );
    }

    //start async function
    runFunction();

});


app.post('/ListScraper', urlencodedParser, function (req, res) {

        url = req.body.url;

        //scrap movie id's from this url
        ListScraper(url, function(err, data) {
            console.log("List Scrapper is Working");
            ScrabFunction(data);
          });
    
        //save scrapped data to storage
        function ScrabFunction(data){ 
            async function ScrapData() {
                console.log(data);
                await storage.init( /* options ... */ );
                await storage.setItem('Scrapedata',data)
                res.redirect('/Play')
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
http.listen(3000, () => {
    console.log('Express server is working')
});
