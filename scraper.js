const imdb = require('imdb');


function getDetails(url) {

return new Promise(function (resolve, reject) {
    imdb(url, function(err, data) {
 
        if(data){
            resolve(data);
          return data;
        }else {
            reject(err);
        }

      });
});
}



exports.getDetails = getDetails;
