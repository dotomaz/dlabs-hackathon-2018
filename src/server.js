var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(8000, function(){
  console.log('listening on *:8000');
});

io.on('connection', (client) => {
    const connectTime = new Date();
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            console.log((new Date()).getTime() - connectTime.getTime());
            client.emit('timer', (new Date()).getTime() - connectTime.getTime());
        }, interval);
    });
});

