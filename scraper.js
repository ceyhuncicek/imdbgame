const imdb = require('imdb');




function getDetails(url) {

return new Promise(function (resolve, reject) {
    imdb(url, function(err, data) {
 
        if(data){

                //change link to improve quality of poster
                data.poster = data.poster.replace("UX182_CR0,0,182,268_AL", "SY1000_CR0,0,675,1000_AL");
                
                resolve(data);
                return data;

        }else {
            reject(err);
        }

      });
});
}



exports.getDetails = getDetails;
