import React, { Component } from "react";

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);     
  }

  render() {
    const containerStyle = {marginTop: '100px', marginLeft: 'auto', marginRight: 'auto', width: '600px', position: 'relative',backgroundColor:'orange', color: 'blue'};  
    let innerDivStyle = {position: 'absolute', top: 0, bottom: 0, left: 0, backgroundColor:'red', color: 'green', width: (600/100*this.props.value)};
    return(
        <div style={containerStyle}>
          <div style={innerDivStyle}>
          </div>
        </div>
      )
  }

}