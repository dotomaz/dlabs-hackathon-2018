import React from 'react';
import { Button } from 'reactstrap';


import '../styles/components/slide.scss';


export default class Slide extends React.Component {

    formatText(text){
        text = text.replace(/<break[^>]+>/gi,"##break##");
        text = text.replace(/<\/prosody[^>]+>/gi,"");
        text = text.replace(/<\/audio[^>]+>/gi,"");
        const arr = text.split("##break##");

        return arr.map((el,i) => {
            return (
                <p key={i}>{el}</p>
            );
        });
    }

  render() {
      let css = "slide slide-"+ this.props.position +" "+this.props.css;
    return (
    <div className={css}>

        { this.props.image && (
            <img src={this.props.image} />
        )}
    
        <div className="text">{this.formatText(this.props.text)}</div>
    </div>

    );
  }
}