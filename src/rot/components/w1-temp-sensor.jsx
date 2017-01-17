import React, { Component, PropTypes } from "react";
import RoTHOC from 'rot/hocs/rot-hoc';

//<W1TempSensor name="name" data={dataObj} id="w1-sensor-id" interval={read-interval-ms} />

const emulateTempSensor = (onChange, interval) => {
  setInterval(() => {
    onChange(Math.floor(Math.random() * 30) + 20);
  }, interval);
}

class W1TempSensor extends Component {
  constructor(props) {
    super(props);

    const { setValue, id, interval } = props;

    if (__RASPI__) props.once(require('rot/raspi/w1.js').default)(setValue, id, interval);
    else if (__NODE__) props.once(emulateTempSensor)(setValue, interval);
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.shape({
      description: PropTypes.string,
      validate: PropTypes.array,
      unit: PropTypes.string,
    }),
    id: PropTypes.string.isRequired,
    interval: PropTypes.number,
    children: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    once: PropTypes.func.isRequired,
  };

  static defaultProps = {
    interval: 10000,
  };

  render() {
    const { children, getValue, name } = this.props;
    return children && children(getValue(name)) || null
  }
}

export default RoTHOC(W1TempSensor);