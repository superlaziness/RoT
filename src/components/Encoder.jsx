import React, { Component } from "react";
import RoTHOC from 'components/hocs/rot';
import raspiHOC from 'components/hocs/raspi';

const sensorData = {
  name: 'reqTemp',
  data: {
    description: 'Required temperature encoder',
    unit: 'C',
    validate: [15, 40],
  }
}

class Encoder extends Component {
  constructor(props) {
    super(props);
    if (__RASPI__) props.raspiListener(require('components/encoderProc.js').default)(props.setValue);
  }

  render() {
    return null
  }
}

export default raspiHOC(RoTHOC(Encoder, sensorData));