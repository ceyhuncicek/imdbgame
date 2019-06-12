const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const storage = require('node-persist');
const scraper = require('./scraper'); 
const AnalyzeScore = require('./AnalyzeScore'); 



// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//set view engine as ejs
app.set('view engine', 'ejs');

//what server will do in get request
app.get('/', (req, res ) => {


    let data = { title: 'The Martian',
    year: '2015',
    description: 'During a manned mission to Mars, Astronaut Mark Watney is presumed dead after a fierce storm and left behind by his crew. But Watney has survived and finds himself stranded and alone on the hostile planet. With only meager supplies, he must draw upon his ingenuity, wit and spirit to subsist and find a way to signal to Earth that he is alive.',
    rating: '8.1',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
    genre: [ 'Adventure', ' Drama', ' Sci-Fi' ]
    }

    res.render ('index', {data: data,} );



});

//what server will do in post request
app.post ('/Play', (req, res) => {

    const url = 'tt0111161';

    //give url as movie id and get back movie details
    scraper.getDetails(url)
    .then((data)=>{
            //console.log(data);


            async function makeRequest() {
                await storage.init( /* options ... */ );
                await storage.setItem ('data', data );
                res.render ('index', {data: data,} );
              }

              makeRequest();



    }).catch((err)=>{
        console.log(err);
    });
});

app.post('/guess', urlencodedParser, function (req, res) {


    //catch post value and name it as score
    score = req.body.score;

    async function makeRequest() {
    
        //gate data value from storage
        data = await storage.getItem('data');

        //check if score is same with data.rating
        AnalyzeScore(score);

        //render page with sending data
        res.render ('index', {data: data,} );
    }

    //start async function
    makeRequest();

});

//while server is working on 3000 port give message
app.listen(3000, () => {
    console.log('Express server is working')
});
