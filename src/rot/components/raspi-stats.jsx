import React, { Component, PropTypes } from "react";
import RoTHOC from 'rot/hocs/rot-hoc';

//<W1TempSensor name="name" data={dataObj} id="w1-sensor-id" interval={read-interval-ms} />

const emulateStats = (handleChange, interval) => {
  setInterval(() => {
    handleChange(false, {
      cpu: {percentUsed: Math.floor(Math.random() * 100)}, 
      memory: {percentUsed: Math.floor(Math.random() * 100)}
    });
  }, interval);
}

class RaspiStats extends Component {
  constructor(props) {
    super(props);

    const { setValue, getValue, interval } = props;

    if (__RASPI__) props.once(require('rot/raspi/stats.js').default)
      (this.handleChange, interval);
    else if (__NODE__) props.once(emulateStats)(this.handleChange, interval);
  }

  static propTypes = {
    interval: PropTypes.number,
    children: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    once: PropTypes.func.isRequired,
  };

  static defaultProps = {
    interval: 1000,
  }

  handleChange = (err, data) => {
    if (err.cpu || err.memory) console.error('RoT Error: Raspi stats', err);
    this.props.setValue(data);
  }

  render() {
    const { children, getValue, getCollection, name } = this.props;
    return children && children(getValue(name), getCollection(name)) || null
  }
}

export default RoTHOC(RaspiStats, {name: 'raspiStats', data: { description: 'Raspberry statistic', collect: 10 }});