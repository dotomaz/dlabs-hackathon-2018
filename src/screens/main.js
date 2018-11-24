import React from 'react';
import { Button } from 'reactstrap';

import socket from '../api/socket';

import '../styles/screen/main.scss';

import Slide from '../components/slide';
import Progress from '../components/progress';
import Idle from '../components/idle';


export default class MainScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      type: "idle",
      text: "",
      step: 0,
      count: 1
    };

    /*socket.subscribeToTimer((err, timer) => { 
      console.log(timer);
      if( timer >= this.state.slides.length){
        timer = this.state.slides.length-1;
      }

      this.setState({ 
        position: timer 
      });
    });*/

    socket.subscribeToExercise((err, text, step, count) => { 
      console.log(text, step, count);

      this.setState({ 
        type: "slide",
        text, 
        step, 
        count
      });
    });

    socket.subscribeToIdle((err, text, step, count) => { 
      console.log(text, step, count);

      this.setState({ 
        type: "idle"
      });
    });

  }

  render() {
    return (
      <div className="main-screen">
        
      {this.state.type == "slide" && (
        <div>
          { this.state.count > 1 && (
            <Progress position={this.state.step} count={this.state.count}/>
          )}
          <Slide position={this.state.step} text={this.state.text} ></Slide>
        </div>
      )}

      {this.state.type != "slide" && (
        <Idle></Idle>
      )}
        
      </div>
    );
  }
}