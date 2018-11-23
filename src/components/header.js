import React from 'react';
import { Button } from 'reactstrap';

import socket from '../api/socket';

import '../styles/components/header.scss';
import logo from '../assets/logo.png';

export default class MainScreen extends React.Component {


  render() {
    return (
      <div className="header">
          <img src={logo}/>
      </div>
    );
  }
}