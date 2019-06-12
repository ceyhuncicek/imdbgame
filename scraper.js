const imdb = require('imdb');



//function get url to get details
function getDetails(url) {

return new Promise(function (resolve, reject) {
    imdb(url, function(err, data) {
 
        if(data){

                //change link to improve quality of poster
                splitted = data.poster.split('.')[3];
                data.poster = data.poster.replace(splitted, "SY1000_CR0,0,675,1000_AL");

                resolve(data);
                return data;

        }else {
            reject(err);
        }

      });
});
}


//export function for other modules
exports.getDetails = getDetails;
