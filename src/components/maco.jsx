import React, { Component } from "react";
import RoTHOC from 'components/hocs/rot';

import { connect } from "react-redux";
import * as actions from "actions/rotActions";

import path from 'path';

import List from "components/list";
import ProgressBar from "components/progressbar";
import Encoder from 'components/Encoder';
import Keypress from 'components/Keypress';


class Maco extends Component {
  constructor(props) {
    super(props);
    this.state = {mode: "reading_data"};
    console.log('rendered', props.rotState);
  }

  handleClick = () => {
    this.state.mode === "reading_data" ? this.setState({mode: "editing_data"}) : this.setState({mode: "reading_data"});
  }

  handleControls = (sign) => {
    const currentState = this.props.getValue('reqTemp');
    switch (sign) {
      case "+":
        this.props.setValue(currentState + 1, 'reqTemp');
        break;
      case "-":
        this.props.setValue(currentState - 1, 'reqTemp');
        break;
      default:
        throw "huynya";  
    }
  }

  handleReset = () => {
    this.props.setValue(0, 'reqTemp');
  }

  render() {
    
    return (
      <div>
        <h1 onClick={this.handleClick}>{this.state.mode === "reading_data" ? "Reading mode" : "Editing mode"}</h1>
        <h2>{this.props.getValue('reqTemp')}</h2>
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
        <ProgressBar value={this.props.getValue('reqTemp')}/>
        <Encoder/>
        <Keypress onChange={this.handleControls}/>
      </div>);
  }
};

const ConnectHOC = connect(state => ({ rotState: state.rotReducer }), actions);

export default RoTHOC(Maco);