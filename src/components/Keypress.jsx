import React, { Component } from "react";
import RoTHOC from 'components/hocs/rot';

const thingData = {
  name: 'reqTemp',
  data: {
    description: 'Required temperature encoder',
    unit: 'C',
    validate: [15, 40],
  }
}

class Keypress extends Component {
  constructor(props) {
    super(props);
    if (__NODE__) props.once(require('components/keyboardpress.js').default)(props.onChange);
  }

  render() {
    return null
  }
}

export default RoTHOC(Keypress, thingData);