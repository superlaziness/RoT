import React, { Component } from "react";

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);     
  }

  render() {
    const containerStyle = {marginTop: '100px',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '600px',
      height: '100px',
      position: 'relative',
      backgroundColor:'#F0F8FF'
    };  
    let innerDivStyle = {position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      backgroundColor:'#7FFFD4',
      width: (600/100*this.props.value)
    };
    
    return(
        <div style={containerStyle}>
          <div style={innerDivStyle}>
          </div>
        </div>
      )
  }

}