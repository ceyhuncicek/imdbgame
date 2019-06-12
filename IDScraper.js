var movies = require('./IDScraper2');

url = "https://www.imdb.com/chart/top";

// module.exports = function(url, cb) {
  
    movies(url, function(err, data) {
      console.log(data);
    });
  
  
// }