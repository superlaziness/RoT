import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "actions/testActions";
import keypress from "keypress";

@connect(state => ({ test: state.testReducer }), actions)
export default class Maco extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    if (!__BROWSER__) {
      if (!global.listeningKeypress) {
        keypress(process.stdin);
        process.stdin.on('keypress', function (ch, key) {
          console.log('got "keypress"', key);
          if (key && key.ctrl &&  key.name == 'w') {
            props.increaseEncoder();
            console.log('increased');
          };
          if (key && key.ctrl && key.name == 'q') {
            props.decreaseEncoder();
            console.log("decreased");
          };
          if (key && key.ctrl && key.name == 'c') {
            process.exit();
          };
        });
        process.stdin.setRawMode(true);
        process.stdin.resume();
      }
      global.listeningKeypress = true;
    }
  }

  handleClick = () => {
    console.log("click");
    this.setState({valuePiska:"Большая писька!"});
  }
    
  render() {
    console.log('rendered', this.props.test);
    return (<div onClick={this.handleClick}>{this.props.test.encoder}</div>);
  }
}