const express = require('express');
const app = express();
const scraper = require('./scraper'); 



var data = { title: 'The Martian',
year: '2015',
contentRating: 'PG-13',
runtime: '2h 24min',
description: 'During a manned mission to Mars, Astronaut Mark Watney is presumed dead after a fierce storm and left behind by his crew. But Watney has survived and finds himself stranded and alone on the hostile planet. With only meager supplies, he must draw upon his ingenuity, wit and spirit to subsist and find a way to signal to Earth that he is alive.',
rating: '8.1',
poster: 'http://ia.media-imdb.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_UX182_CR0,0,182,268_AL_.jpg',
genre: [ 'Adventure', ' Drama', ' Sci-Fi' ],
director: 'Ridley Scott',
metascore: '80',
writer: 'Drew Goddard' };

//console.log(data.title);
// const url = 'tt3659388';
// //give url as movie id and get back movie details
// scraper.getDetails(url)
// .then((data)=>{
//     console.log(data);
// }).catch((err)=>{
//     console.log(err);
// });

app.set('view engine', 'ejs');


app.get('/', (req, res ) => {
    res.render ('index', {data: data,} );

 });


app.post ('/', (req, res) => {
    res.send("Post isteği gönderildi");
});





app.listen(3000, () => {
    console.log('express server is working')

});

