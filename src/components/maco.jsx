import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "actions/testActions";
//import keypress from "keypress";
import List from "components/list";
import keyboardPress from "components/keyboardpress";
import ProgressBar from "components/progressbar";

@connect(state => ({ test: state.testReducer }), actions)
export default class Maco extends Component {
  constructor(props) {
    super(props);
    keyboardPress(props);
    this.state = {mode: "reading_data"};
  }

  handleClick = () => {
    console.log(this.state.mode);
    this.state.mode === "reading_data" ? this.setState({mode: "editing_data"}) : this.setState({mode: "reading_data"});
  }

  handleControls = (sign) => {
    if(this.state.mode === "editing_data") {
      switch (sign) {
        case "+":
          this.props.increaseEncoder();
          break;
        case "-":
          this.props.decreaseEncoder();
          break;
        default:
          throw "huynya";  
      }
    }
  }
   
   
  render() {
    console.log('rendered', this.props.test);
    return (
      <div>
        <h1 onClick={this.handleClick}>{this.state.mode === "reading_data" ? "Reading mode" : "Editing mode"}</h1>
        <h2>{this.props.test.encoder}</h2>
        {
          (this.state.mode === "editing_data")
            ? <div>
                <button onClick={() => this.handleControls("+")}>+</button> 
                <button onClick={() => this.handleControls("-")}>-</button><br/>
                <span>Click the header to enter reading mode</span>
              </div>
            : <div>Click the header to enter editing mode</div>  
        }
        <List/>    
        <ProgressBar value={this.props.test.encoder}/>  
      </div>);
  }
}