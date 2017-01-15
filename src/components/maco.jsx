import React, { Component } from "react";
import RoTHOC from 'components/hocs/rot';
import raspiHOC from 'components/hocs/raspi';

import path from 'path';

import List from "components/list";
import ProgressBar from "components/progressbar";

class Maco extends Component {
  constructor(props) {
    super(props);

    if (__NODE__) props.raspiListener(require('components/keyboardpress.js').default)(props);
    if (__RASPI__) props.raspiListener(require('components/encoder.js').default)(props.setValue);

    this.state = {mode: "reading_data"};
  }

  handleClick = () => {
    console.log(this.state.mode);
    this.state.mode === "reading_data" ? this.setState({mode: "editing_data"}) : this.setState({mode: "reading_data"});
  }

  handleControls = (sign) => {
    if(this.state.mode === "editing_data") {
      const currentState = this.props.rotState.encoder;
      switch (sign) {
        case "+":
          this.props.setValue(currentState + 1);
          break;
        case "-":
          this.props.setValue(currentState - 1);
          break;
        default:
          throw "huynya";  
      }
    }
  }

  handleReset = () => {
    this.props.setValue(0);
  }

  render() {
    console.log('rendered', this.props.rotState);
    return (
      <div>
        <h1 onClick={this.handleClick}>{this.state.mode === "reading_data" ? "Reading mode" : "Editing mode"}</h1>
        <h2>{this.props.rotState.encoder}</h2>
        {
          (this.state.mode === "editing_data")
            ? <div>
                <button onClick={() => this.handleControls("+")}>+</button> 
                <button onClick={() => this.handleControls("-")}>-</button><br/>
                <button onClick={this.handleReset}>reset</button><br/>
                <span>Click the header to enter reading mode</span>
              </div>
            : <div>Click the header to enter editing mode</div>  
        }
        <List/>    
        <ProgressBar value={this.props.rotState.encoder}/>  
      </div>);
  }
}

export default raspiHOC(RoTHOC(Maco), 'encoder');