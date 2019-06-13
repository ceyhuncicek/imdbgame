var request = require('request');
var cheerio = require('cheerio');



module.exports = function(url, cb) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = body.replace(/(\r\n|\n|\r)/gm,"").replace(/ +(?= )/g,'');
      $ = cheerio.load(body);

        var id = [];
        var Movieid = [];
        var title = [];
        var year = [];
        var poster = [];
        var rating = [];

      
        for (i = 1; i < 250; i++) {

            id[i] = [i];
            Movieid[i] = $('#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(' + i +') > td.titleColumn > a').attr('href')
            title[i] = $('#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(' + i +') > td.titleColumn > a').text();
            year[i] = $('#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(' + i +') > td.titleColumn > span').text();
            poster[i] = $('#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(' + i +') > td.posterColumn > a >img ').attr('src');
            rating[i] = $('#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(' + i +') > td.ratingColumn.imdbRating > strong').text();




            if (Movieid[i]){
              Movieid[i] = Movieid[i].split("/")[2];
            } else {
              Movieid[i] =  "N/A";
            }

          }

      cb(null, {
          
        id: id || "N/A",
        Movieid: Movieid || "N/A",
        title: title || "N/A",
        year: year || "N/A",
        poster: poster || "N/A",
        rating: rating || "N/A"


      });

    } else { 
      cb(new Error('IMDB Failed to respond, or responded with error code'), null); 
    }
  }); 
}