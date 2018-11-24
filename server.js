const {conversation} = require( './src/api/conversation');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const path = require('path');


const {
    dialogflow,
    Image,
  } = require('actions-on-google');

const flow = dialogflow();

const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



flow.intent('Start new excercise', conv => {
    console.log(conv.intent);
    console.log(conv.parameters);
    let Type = "";
    let PeopleCount = 0;
    let duration = 0;

    if( conv.parameters ){
        Type = conv.parameters.Type ? conv.parameters.Type[0] : "";
        PeopleCount = conv.parameters.PeopleCount ? conv.parameters.PeopleCount : "";
        duration = conv.parameters.duration ? conv.parameters.duration.amount : "";
    }

    switch(Type){
        case 'fun':
            conversation.startNew('relax', conv);
            break;
        case 'creative':
            conversation.startNew('creative', conv);
            break;
        case 'relaxed':
            conversation.startNew('relax', conv);
            break;
        case 'feedback':
            conversation.startNew('relax', conv);
            break;
        default:
            conversation.sayGoodbye("I don't know what exercise to start.",conv);
    }

    //conv.ask('This is Billy. I love you honey!!!!');
});

flow.intent('Control', conv => {
    console.log(conv.parameters);

    if( conv.parameters.Confirmation && conv.parameters.Confirmation.length > 0){
        conversation.nextStep(conv);
    }else if( conv.parameters.Repeat && conv.parameters.Repeat.length > 0){
        conversation.repeat(conv);
    }else if( conv.parameters.Close && conv.parameters.Close.length > 0){
        conversation.finish(conv);
    }else{
        conversation.sayGoodbye("I didn't understand this control request.",conv);
    }

});


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/test', function(req, res){
    res.send('testing 123');
});

/*app.post('/api', function(req, res){
    console.log(req.body);      // your JSON
    let text = "I don't undestand.";
    
    if(req.body.queryResult && req.body.queryResult.queryText){
        text = req.body.queryResult.queryText;
    }

    res.contentType("text/plain");
    res.send(text);
});*/

app.post('/api', flow);

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

