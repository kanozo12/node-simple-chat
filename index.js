let express = require('express');
let http = require('http');
let path = require('path');

let app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.get('/main', (req, res)=>{
    res.render('main', {msg:'Welcome to express 4!'});
});

http.createServer(app).listen(10500, ()=>{
    console.log("서버 실행중 : 10500포트");
});






