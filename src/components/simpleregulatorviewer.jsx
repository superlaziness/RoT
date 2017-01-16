import React, { Component } from "react";
import ProgressBar from 'components/progressbar'

export default class SimpleRegulatorViewer extends Component {
  constructor() {
    super();     
  }

  render() {
    const containerStyle = {
      width: '800px',
      height: '400px',
      position: 'relative',
      backgroundColor:'#99DDFF',
    };  

    const indicator = {
      width: '50px',
      height: '50px',
      backgroundColor:'#B3FFD9',
    };

    const textCentred = {
      position: 'relative',
      zIndex: '1'
    };

    this.props.output === 1 
      ? indicator.backgroundColor = '#FF0000'
      : indicator.backgroundColor = '#B3FFD9';

    return(
        <div style={containerStyle}>
          <div style={indicator}>
          </div>
          <h2>Temp:{this.props.sensor}</h2>
          <h2>Threshold:</h2>
          <ProgressBar value={this.props.threshold}/> 
        </div>
      )
  }
}