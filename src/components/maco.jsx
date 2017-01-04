import React, { Component } from "react";

export default class Maco extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valuePiska: "Маленькая писька",
    };  
  }

    handleClick = () => {
      console.log("click");
      this.setState({valuePiska:"Большая писька!"});
    }
    
  render() {
    return (<div onClick={this.handleClick}>{this.state.valuePiska}</div>);
  }
}