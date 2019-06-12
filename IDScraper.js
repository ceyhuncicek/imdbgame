var movies = require('./IDScraper2');

url = "https://www.imdb.com/chart/moviemeter?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=4da9d9a5-d299-43f2-9c53-f0efa18182cd&pf_rd_r=W987ZYCJE05891WY61RC&pf_rd_s=right-4&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_ql_2";

// module.exports = function(url, cb) {
  
    movies(url, function(err, movieIDs) {
      console.log(movieIDs);
    });
  
  
// }