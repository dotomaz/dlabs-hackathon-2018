const conversationData = [
    {   name: "relax",
        text: '',
        doneText: "Lets continue the meeting.",
        steps: [
            {
                text:   '<prosody rate="medium">Sure, I\'d suggest some mindful breathing. You\'ll be as good as new in just a couple of minutes.'+
                        '<break time="1s"/>Shall we start?</prosody>'+
                        '<break time="3s"/>'+
                        '<prosody rate="medium">Find a comfortable position with a straight back.</prosody>  '+
                        '<break time="3s"/>'+
                        '<prosody rate="medium">Gently rest your arms on your lap.</prosody>'+
                        '<break time="3s"/>'+
                        '<prosody rate="medium">Breathe in deeply.</prosody> '+
                        '<break time="3s"/>'+
                        '<prosody rate="medium">Hold for four seconds. One, two, three, four.</prosody> '+
                        '<break time="3s"/>'+
                        '<prosody rate="medium">And exhale slowly. One, two, three, four, five, six, seven, eight</prosody>  '+
                        '<break time="3s"/>'+
                        '<prosody rate="medium">Breathe in deeply.</prosody>  '+
                        '<break time="3s"/>'+
                        '<prosody rate="medium">Hold for four seconds.One, two, three, four.</prosody> '+
                        '<break time="3s"/>'+
                        '<prosody rate="medium">And exhale slowly. One, two, three, four, five, six, seven, eight</prosody>  '+
                        '<break time="3s"/>'+
                        '<prosody rate="medium">Now return to your natural breath.</prosody>'+
                        '<break time="10s"/>'+
                        '<prosody rate="medium">Slowly bring your attention back to the room. And when you\'re ready, open your eyes. Look up to the skies and see.</prosody> '+
                        '<break time="3s"/>'+
                        '<audio src="http://www.hibberts.co.uk/dorko5lr.wav"></audio>',
                duration: 12000
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
                duration: 12000
            },

        ]
    },
    {   name: "fun",
        text: "",
        doneText: "Lets continue the meeting.",
        steps: [
            {
                text: 'Ok, I have something interesting for you. Let\'s do an energiser called "I love you honey". This might seem silly at first, but humor me. It will help you relax.'+
                    '<break time="1s"/>Ready to start?!'+
                    '<break time="3s"/>'+
                    'Now listen carefully. One person should now go in the middle of the circle, walk up to another person and say: <break time="0.5s"/>  “I love you honey, won’t you give me a smile?”'+
                    '<break time="1s"/>'+
                    'The other person needs to respond with, <break time="0.5s"/>“I love you too honey, but I just can’t smile,'+
                    '<break time="0.5s"/> ... without smiling, of course.'+
                    '<break time="1s"/>'+
                    '<break time="0.5s"/>If this person cracks a smile, they need to switch places with the one in the middle. '+
                    '<break time="2s"/>'+
                    'Ready to start?!?',
                duration: 30000
            },
            {
                text: 'Enjoy. If you need me to repeat the rules, just shout my name!',
                duration: 120000
            },
        ]
    },
    {   name: "winner",
        text: "",
        doneText: "Thank you everybody!",
        steps: [
            {
                text: 'You know who... If you still don\'t, check your mobile phone.',
                duration: 120000
            },
        ]
    },
];

class Conversation
{
    constructor(){
        this.exercise = null;
        this.step = 0;
        this.timer = null;
        this.socletIoClient = null;
    }

    setClient(client){
        this.socletIoClient = client;
    }

    showSlide(){
        if( this.socletIoClient === null){
            return;
        }

        this.socletIoClient.emit("exercise", {
            text: this.getCurrentText(),
            step: this.getCurrentStep(),
            count: this.getStepCount()
        });

    }

    showIdle(){
        if( this.socletIoClient === null){
            return;
        }

        this.socletIoClient.emit("idle", {});

    }

    say(text, conv, breakTime){
        if(!conv) return;
        if( typeof breakTime === undefined) { breakTime = 0;}
        if(!text || text.length == 0){ return;}

        if( breakTime > 0){
            text += ' <break time="'+breakTime+'ms"/> ';
        }

        console.log('SAY: '+text+'');
        conv.ask('<speak>'+text+'</speak>');
    }
    
    sayGoodbye(text, conv){
        this.showIdle();

        if(!conv) return;

        console.log('CLOSE: <speak>'+text+'</speak>');
        conv.close('<speak>'+text+'</speak>');
        //conv.close(text);

        
    }

    getCurrentText(){
        let step = this.getCurrentStep();
        if(step < this.exercise.steps.length ){
            return this.exercise.steps[step].text;
        }
        return "";
    }

    getCurrentStep(){
        return this.step > 0 ? this.step-1: 0;
    }

    getStepCount(){
        return this.exercise.steps.length;
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
            this.showSlide();
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