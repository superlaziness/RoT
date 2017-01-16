import React, { Component } from "react";
import RoTHOC from 'components/hocs/rot';

const options = {
  name: 'heating',
  data: {
    description: 'Heating actuator',
  }
};

class Led extends Component {
  constructor(props) {
    super(props);
    if (__RASPI__) require('raspi/led.js').default(props.getValue(options.name));
  }

  render() {
    return this.props.children && this.props.children(this.props.getValue(options.name)) || null
  }
}

export default RoTHOC(Led, options);