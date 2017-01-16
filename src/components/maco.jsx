import React, { Component } from "react";
import RoTHOC from 'components/hocs/rot';

import { connect } from "react-redux";
import * as actions from "actions/rotActions";

import path from 'path';

import List from "components/list";
import ProgressBar from "components/progressbar";
//import Encoder from 'components/Encoder';
import Keypress from 'components/Keypress';
import TelegramBot from 'components/telegram';
import W1Temp from 'components/sensors/w1-temp';
import Led from 'components/actuators/led';


class Maco extends Component {
  constructor(props) {
    super(props);
    this.state = {mode: "reading_data"};
    if (__NODE__) this.controlHeating();
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

  controlHeating = () => {
    const { getValue, setValue } = this.props;
    const temp = getValue('temp');
    const heating = getValue('heating');
    const newHeating = (temp < 30) ? 1 : 0;
    if (heating !== newHeating) setValue(newHeating, 'heating');
  }

  render() {
    
    return (
      <div>
        <h1 onClick={this.handleClick}>{this.state.mode === "reading_data" ? "Reading mode" : "Editing mode"}</h1>
        <h2>{this.props.getValue('temp')} <Led>{(heating) => (<span>{heating ? 'heating' : ''}</span>)}</Led></h2>
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
        {/*<Encoder/>*/}
        <Keypress onChange={this.handleControls}/>
        <TelegramBot getValue={this.props.getValue}/>
        <W1Temp>
          {(temp) => (<div>temp: {temp}</div>)}
        </W1Temp>
      </div>);
  }
};

const ConnectHOC = connect(state => ({ rotState: state.rotReducer }), actions);

export default RoTHOC(Maco);