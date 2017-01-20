import { Component, PropTypes } from 'react';
import RoTHOC from 'rot/hocs/rot-hoc';

// <W1TempSensor name="name" data={dataObj} id="w1-sensor-id" interval={read-interval-ms} />

const emulateStats = (handleChange, interval) => {
  setInterval(() => {
    handleChange(false, {
      cpu: { percentUsed: Math.floor(Math.random() * 100) },
      memory: { percentUsed: Math.floor(Math.random() * 100) },
    });
  }, interval);
};

class RaspiStats extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    interval: PropTypes.number,
    children: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    getCollection: PropTypes.func.isRequired,
  };

  static defaultProps = {
    interval: 1000,
    children: null,
  }

  componentDidMount() {
    const { interval } = this.props;
    if (__RASPI__) require('rot/raspi/stats.js').default(this.handleChange, interval);
    else if (__NODE__) emulateStats(this.handleChange, interval);
  }

  handleChange = (err, data) => {
    if (process && (err.cpu || err.memory)) process.stdout.write('RoT Error: Raspi stats', err);
    this.props.setValue(data);
  }

  render() {
    const { children, getValue, getCollection, name } = this.props;
    return children && children(getValue(name), getCollection(name));
  }
}

export default RoTHOC(RaspiStats, { name: 'raspiStats', data: { description: 'Raspberry statistic', collect: 10 } });
