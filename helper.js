const storage = require('node-persist');
const ListScraper = require('./ListScraper');



module.exports.RandomPicker = function RandomPicker(data){
       let min=1; 
       let max=250;  
       let random = Math.floor(Math.random() * (+max - +min)) + +min; 

       data.title = data.title[random];
       data.genre = "";
       data.poster = data.poster[random];
       splitted = data.poster.split('.')[3];
       data.poster  = data.poster.replace(splitted, "SY1000_CR0,0,675,1000_AL");

       data.year = data.year[random];
       data.rating = data.rating[random];
        // console.log(random);
        console.log("ben çalıştım");

       return data;

}

module.exports.DummyData = { title: 'The Martian',
year: '2015',
description: 'During a manned mission to Mars, Astronaut Mark Watney is presumed dead after a fierce storm and left behind by his crew. But Watney has survived and finds himself stranded and alone on the hostile planet. With only meager supplies, he must draw upon his ingenuity, wit and spirit to subsist and find a way to signal to Earth that he is alive.',
rating: '8.1',
poster: 'https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
genre: [ 'Adventure', ' Drama', ' Sci-Fi' ]
}


module.exports.AnalyzeScore = function AnalyzeScore(score,data) {
    if (data.rating == score){
        data.poster = "https://cdn4.iconfinder.com/data/icons/generic-interaction/143/yes-tick-success-done-complete-check-allow-512.png";
    }
    else {
        data.poster = "https://cdn3.iconfinder.com/data/icons/simple-web-navigation/165/cross-512.png";
    }
}




module.exports.top250scraper = function top250scraper() {


    url = "https://www.imdb.com/chart/top";

    //scrap movie id's from this url
    ListScraper(url, function(err, data) {
        console.log("Top250 Movie Data Scrapped");
        calistir(data);
      });

    //save scrapped data to storage
    function calistir(data){ 
        // var Scrapedata = data;
        async function makeRequest() {
            Scrapedata = data;
            await storage.init( /* options ... */ );
            await storage.setItem('Scrapedata',Scrapedata);
            res.redirect('/');
    
          }
          makeRequest();
    }
      


}



// module.exports.DummyDataBigger = { "title": ["The Martian", "The Shawshank Redemption","The Godfather",'Casablanca'],
// "year": ["2015", "1994", "1972",'1942',],
// "rating": ["8.1","9.3", "9.2",'8.5'],
// "poster": ["https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
//  "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@.SY1000_CR0,0,675,1000_AL.jpg",
//  "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@.SY1000_CR0,0,675,1000_AL.jpg",
//  'https://m.media-amazon.com/images/M/MV5BY2IzZGY2YmEtYzljNS00NTM5LTgwMzUtMzM1NjQ4NGI0OTk0XkEyXkFqcGdeQXVyNDYyMDk5MTU@.SY1000_CR0,0,675,1000_AL.jpg',]}


