import React, { Component } from "react";
import RoTHOC from 'components/hocs/rot';

const options = {
  name: 'temp',
  data: {
    description: 'Temperature',
    unit: 'C',
    validate: [-50, 200],
  }
};

const id = '10-0008024f9ea9';

class W1Temp extends Component {
  constructor(props) {
    super(props);
    if (__RASPI__) props.once(require('raspi/w1.js').default)(props.setValue, id);
  }

  render() {
    return this.props.children && this.props.children(this.props.getValue(this.props.options.name)) || null
  }
}

export default RoTHOC(W1Temp, options);