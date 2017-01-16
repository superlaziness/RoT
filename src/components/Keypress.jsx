import React, { Component } from "react";
import RoTHOC from 'components/hocs/rot';
import raspiHOC from 'components/hocs/raspi';

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
    if (__NODE__) props.raspiListener(require('components/keyboardpress.js').default, 'keypress')(this.props.onChange);
  }

  render() {
    return null
  }
}

export default RoTHOC(raspiHOC(Keypress), thingData);