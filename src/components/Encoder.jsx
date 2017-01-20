import React, { Component } from 'react';
import RoTHOC from 'components/hocs/rot';

const sensorData = {
  name: 'reqTemp',
  data: {
    description: 'Required temperature encoder',
    unit: 'C',
    validate: [15, 40],
  },
};

class Encoder extends Component {
  constructor(props) {
    super(props);
    if (__RASPI__) props.once(require('components/encoderProc.js').default)(props.setValue);
  }

  render() {
    return null;
  }
}

export default RoTHOC(Encoder, sensorData);
