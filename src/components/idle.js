import React from 'react';
import { Button } from 'reactstrap';

import socket from '../api/socket';

import '../styles/components/idle.scss';
import idleImage from '../assets/billy-idle.gif';

export default class Idle extends React.Component {


  render() {
    return (
      <div className="idle">
          <img src={idleImage}/>
      </div>
    );
  }
}