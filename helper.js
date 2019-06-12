

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

module.exports.data = { title: 'The Martian',
year: '2015',
description: 'During a manned mission to Mars, Astronaut Mark Watney is presumed dead after a fierce storm and left behind by his crew. But Watney has survived and finds himself stranded and alone on the hostile planet. With only meager supplies, he must draw upon his ingenuity, wit and spirit to subsist and find a way to signal to Earth that he is alive.',
rating: '8.1',
poster: 'https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
genre: [ 'Adventure', ' Drama', ' Sci-Fi' ]
}

