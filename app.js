const express = require('express');
const app = express();
const scraper = require('./scraper'); 

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

    const url = 'tt3659388';

    //give url as movie id and get back movie details
    scraper.getDetails(url)
    .then((data)=>{
            //console.log(data);
            res.render ('index', {data: data,} );

    }).catch((err)=>{
        console.log(err);
    });
});



//while server is working on 3000 port give message
app.listen(3000, () => {
    console.log('Express server is working')
});
