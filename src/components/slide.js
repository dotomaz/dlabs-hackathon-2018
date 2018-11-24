import React from 'react';
import { Button } from 'reactstrap';


import '../styles/components/slide.scss';


export default class Slide extends React.Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }
  render() {
      let css = "slide slide-"+ this.props.position +" "+this.props.css;
    return (
    <div className={css}>

        { this.props.image && (
            <img src={this.props.image} />
        )}
    
        <div className="text">{this.props.text}</div>
    </div>

    );
  }
}