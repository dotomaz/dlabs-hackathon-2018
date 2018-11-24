import React from 'react';
import { Button } from 'reactstrap';

import socket from '../api/socket';

import '../styles/components/progress.scss';


export default class Progress extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            count: props.count ? parseInt(props.count): 0
        }
    }
  render() {
    return (
      <div className="progress">
        { Array(this.state.count).fill(0).map((el, i) => { 
            let css = i == this.props.position ? "el selected" : "el";
            return (
                <div key={i} className={css}></div>
            );
        })}
          
      </div>
    );
  }
}