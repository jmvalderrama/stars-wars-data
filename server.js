const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile(__dirname + '/public/index.html', (err, data) => {
        res.writeHead(200);
        res.end(data);
    });
}).listen(3000);
console.log('Server running at http://localhost:3000');