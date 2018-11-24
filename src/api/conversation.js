const conversationData = [
    {   name: "relax",
        text: "This exercise will help us test the app.",
        doneText: "Lets continue the meeting.",

        steps: [
            {
                text: "This is step 1 of the exercise.",
                duration: 60000
            },
            {
                text: "This is step 2 of the exercise.",
                duration: 60000
            },
            {
                text: "This is step 3 of the exercise.",
                duration: 60000
            }
        ]
    },
    {   name: "creative",
        text: "",
        doneText: "Lets continue the meeting.",

        steps: [
            {
                text: 'Sure, let\'s try Crazy eights, which is a core Design Sprint method. It\'s basically fast '+
                'sketching that challenges people to create eight distinct ideas in eight minutes.'+ 
                '<break time="1s"/>'+
                'This is how you do it.'+
                '<break time="1s"/>'+
                'Take a piece of paper and fold it in eight sections. '+
                '<break time="1s"/>'+
                'Next set the timer for 8 minutes. If you ask me later, I can also do that for you.'+
                '<break time="1s"/>'+
                'The third step is for each team member to sketch one idea in each rectangle. When the time runs out, '+
                ' put your pens down and present your ideas to others.'+  
                '<break time="1s"/>'+
                'Just as a general note, it\'s important to remember that ideas don\'t have to be great. '+
                'This is an exercise to quiet your inner critic and help your creative juices flowing. '+
                '<break time="1s"/>'+
                'Enjoy the crazy eights. If you need me to repeat the rules, just shout my name!',
                duration: 0
            },

        ]
    },
    
]

class Conversation
{
    constructor(){
        this.exercise = null;
        this.step = 0;
        this.timer = null;
    }

    say(text, conv, breakTime){

        if( typeof breakTime === undefined) { breakTime = 0;}
        if(!text || text.length == 0){ return;}

        if( breakTime > 0){
            text += ' <break time="'+breakTime+'ms"/> ';
        }

        console.log('SAY: '+text+'');
        conv.ask('<speak>'+text+'</speak>');
        //conv.ask(text);
    }
    
    sayGoodbye(text, conv){
        console.log('CLOSE: <speak>'+text+'</speak>');
        conv.close('<speak>'+text+'</speak>');
        //conv.close(text);
    }

    startNew(name, conv){
        let ok = false;
        conversationData.forEach((el, i)=>{
            if( el.name == name){
                this.exercise = el;
                this.step = 0;

                this.say(this.exercise.text, conv);
                this.nextStep(conv);
                
                ok = true;
            }
        });

        if (!ok) {
            this.say("I can't find this exercise!", conv);
        }
    }

    repeat(conv){
        if(this.step > 0){
            this.step--;
        }

        this.nextStep(conv);
    }

    nextStep(conv){

        if(this.exercise === null) {
            this.say("You must select an exercise first.", conv);
            return;
        }

        if(this.step < this.exercise.steps.length ){
            const es = this.exercise.steps[this.step];
            this.say(es.text, conv, es.duration);
            this.step++;
            
        }else{
            this.finish(conv);
        }

    }

    finish(conv){
        this.sayGoodbye(this.exercise.doneText, conv);
    }

    pause(duration, conv){
        if(duration==0) {return;}
        this.say('<break time="'+duration+'ms"/>', conv);
    }
}

const conversation = new Conversation();
exports.conversation = conversation;