const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
//var https = require('https');
//var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/test', function(req, res){
res.send('testing 123');
});

app.post('/api', function(req, res){
    console.log(req.body);      // your JSON
    let text = "I don't undestand.";
    
    if(req.body.queryResult && req.body.queryResult.queryText){
        text = req.body.queryResult.queryText;
    }

    res.contentType("application/json");
    res.send(text);
});

http.listen(8000, function(){
  console.log('listening on *:8000');
});

io.on('connection', (client) => {
    const connectTime = new Date();
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            const time = Math.round(((new Date()).getTime() - connectTime.getTime()) / 1000 );
            //console.log(time);
            client.emit('timer', time);
        }, interval);
    });
});

