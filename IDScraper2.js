var request = require('request');
var cheerio = require('cheerio');

module.exports = function(url, cb) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = body.replace(/(\r\n|\n|\r)/gm,"").replace(/ +(?= )/g,'');
      $ = cheerio.load(body);

        var id = [];
        for (let i = 0; i < 250; i++) {

            id[i] = $('#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(' + i +') > td.titleColumn > a').attr('href')
            
            if (id[i]){
            id[i] = id[i].split("/")[2];
            } else {
            id[i] =  "N/A";
            }

        }
      
      cb(null, {
        id: id || "N/A"
      });
    } else { 
      cb(new Error('IMDB Failed to respond, or responded with error code'), null); 
    }
  }); 
}