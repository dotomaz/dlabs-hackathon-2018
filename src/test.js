const {conversation} = require( './api/conversation');



const conv ={
    ask: (text) => console.log("ask:"+ text),
    get: (text, cb) => {
        console.log(text+":");
        var stdin = process.openStdin();
        stdin.addListener("data", function(d) {
            cb(d.toString().trim());
        });
    } 
};
console.log(conversation);
conversation.startNew("relax", conv);

/*conv.get("What's next?", (text) =>{
   if( text == "new" ) {
    conversation.startNew("test1", conv);
   } else if (text === "next"){
    conversation.nextStep( conv);
   }
});*/