//숙제 main.ejs를 퍼블리싱해서 채팅사이트 처럼 만들것!
//엔터키시 전송될 수 있도록 할 것.
//개인별로 채팅글자 색상 정할 수 있게 할것
//채팅 내용이 스크롤 될 수 있게 (스크롤 탑)

let express = require('express');
let http = require('http');
let path = require('path');

let app = express();
let server = http.Server(app);

let io = require('socket.io')(server);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.get('/main', (req, res) => {
    res.render('main', {msg:'Welcome to express 4!'});
});

let nickList = ['수달', '멍멍', '곤달', '스트', '유튜버'];
//소켓 작업
io.on('connection', (socket) =>{
    console.log(socket.id);
    console.log("클라이언트 접속");
    let idx = Math.floor(Math.random() * nickList.length);
    let randomNick = nickList[idx];
    socket.nickname = randomNick;

    socket.on('change', (data)=>{
        let name = data.name;
        io.emit('server-msg', {text: `${socket.nickname}님이 ${name} 으로 변경하였습니다.`});
        socket.nickname = name;
    });

    socket.on('gondr', (data)=>{
        let msg = `${socket.nickname} : ${data.text}`;
        io.emit('server-msg', {text: msg});
    })

    socket.on('disconnect', ()=>{
        console.log("유저 연결 종료");
    });
});

server.listen(10500, ()=>{
    console.log("서버가 10500포트에서 실행중입니다.");
});