import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "actions/rotActions";



const ConnectHOC = connect(state => ({ rotState: state.rotReducer }), actions);

const RoTHOC = (WrappedComponent, options = {}) => {
  const { group, name, data } = options;

  const RoTComponent = class extends Component {

    constructor(props) {
      super(props);
    }

    setValue = (value, g = group, n = name, d = data) => {
      console.log('set value', value, g, n, d);
      if (g && n) this.props.changeValue(value, g, n, d);
    }

    getValue = (g = group, n = name) => {
      if (!this.props.rotState) {
        console.warn(`RoT error: no state`);
        return 0
      };
      const { things } = this.props.rotState;
      if (!things[g]) {
        console.warn(`RoT error: group ${g} not presented in state`);
        return 0
      };
      if (!things[g][n]) {
        console.warn(`RoT error: thing ${n} not presented in group ${g}`);
        return 0
      };
      return things[g][n].value
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          setValue={this.setValue} 
          getValue={this.getValue}
          group={group}
          name={name}
          data={data}
        />
      )
    }
  }

  return ConnectHOC(RoTComponent);
};

export default RoTHOC;