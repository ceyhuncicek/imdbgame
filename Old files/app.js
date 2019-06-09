const http = require('http');
const fs = require ('fs');
const scraper = require ('./scraper');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url=='/'){
        res.statusCode = 200;
        //fs.createReadStream('./Assest/index.html').pipe(res);
        console.log(scraper.data);

        res.setHeader('Content-Type', 'text/plain');
        res.end('hi2');
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 not found');
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});