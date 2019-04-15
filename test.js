let http = require('http');
let fs = require('fs');

let server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    let file = fs.createReadStream('./index.html');

    file.on('open', () => {
        file.pipe(res);
    });
});

server.on('connection', () => {
    console.log("웹브라우저가 접속되었습니다.");
});

server.on('close', () => {
    console.log("서버 연결 종료");
});

server.listen(10500);