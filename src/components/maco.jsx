import React from "react";
import RotComponent from 'components/rot';

import List from "components/list";
import ProgressBar from "components/progressbar";

export default class Maco extends RotComponent {
  constructor(props) {
    super(props);

    if (!__BROWSER__ && process.arch === 'arm') {
      require('components/keyboardpress.js').default(props);
      require('components/encoder.js').default(props.setValue);
    };

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
          this.changeValue(currentState + 1);
          break;
        case "-":
          this.changeValue(currentState - 1);
          break;
        default:
          throw "huynya";  
      }
    }
  }

  handleReset = () => {
    this.changeValue(0);
  }

  render() {
    //console.log('rendered', this.props.test);
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