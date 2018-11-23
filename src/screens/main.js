import React from 'react';
import { Button } from 'reactstrap';

import socket from '../api/socket';

import '../styles/screen/main.scss';

export default class MainScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      timer: "no timer set"
    };

    socket.subscribeToTimer((err, timer) => this.setState({ 
      timer 
    }));

  }

  render() {
    return (
      <div className="main-screen">
          {this.state.timer}
      </div>
    );
  }
}