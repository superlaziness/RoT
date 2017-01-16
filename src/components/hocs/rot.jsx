import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "actions/rotActions";



const ConnectHOC = connect(state => ({ rotState: state.rotReducer }), actions);

const RoTHOC = (WrappedComponent, options = {}) => {
  const { name, data } = options;

  const RoTComponent = class extends Component {

    constructor(props) {
      super(props);
    }

    setValue = (value, n = name, d = data) => {
      if (n) this.props.setValueAction(value, n, d);
    }

    getValue = (n = name) => {
      return this.props.getValueAction(n);
    }

    getData = (n = name) => {
      return this.props.getDataAction(n);
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          setValue={this.setValue} 
          getValue={this.getValue}
          getData={this.getData}
          name={name}
          data={data}
        />
      )
    }
  }

  return ConnectHOC(RoTComponent);
};

export default RoTHOC;