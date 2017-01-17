import React, { Component, PropTypes } from "react";
import RoTHOC from 'rot/hocs/rot-hoc';

//<W1TempSensor name="name" data={dataObj} id="w1-sensor-id" interval={read-interval-ms} />

// const emulateTempSensor = (onChange, interval) => {
//   setInterval(() => {
//     onChange(Math.floor(Math.random() * 30) + 20);
//   }, interval);
// }

class RaspiStats extends Component {
  constructor(props) {
    super(props);

    const { setValue, getValue, interval } = props;

    if (__RASPI__) props.once(require('rot/raspi/stats.js').default)
      (handleCpuChange, handleMemoryChange, interval);
   // else if (__NODE__) props.once(emulateTempSensor)(setValue, interval);
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

  handleCpuChange = (err, data) => {
    if (err) console.error('RoT Error: Raspi stats', err);
    const { getValue, setValue, name } = this.props;
    const value = getValue(name) || {};
    setValue({ ...value, cpu: data });
  }

  handleMemoryChange = (err, data) => {
    if (err) console.error('RoT Error: Raspi stats', err);
    const { getValue, setValue, name } = this.props;
    const value = getValue(name) || {};
    setValue({ ...value, memory: data });
  }

  render() {
    const { children, getValue, name } = this.props;
    return children && children(getValue(name)) || null
  }
}

export default RoTHOC(RaspiStats, {name: 'raspiStats', data: { description: 'Raspberry statistic' }});