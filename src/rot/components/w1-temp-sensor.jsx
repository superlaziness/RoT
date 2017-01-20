import { Component, PropTypes } from 'react';
import RoTHOC from 'rot/hocs/rot-hoc';

// <W1TempSensor name="name" data={dataObj} id="w1-sensor-id" interval={read-interval-ms} />

const emulateTempSensor = (onChange, interval) => {
  setInterval(() => {
    onChange(Math.floor(Math.random() * 30) + 20);
  }, interval);
};

class W1TempSensor extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    interval: PropTypes.number,
    children: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
  };

  static defaultProps = {
    interval: 10000,
    children: null,
  };

  componentDidMount() {
    const { setValue, id, interval } = this.props;
    if (__RASPI__) require('rot/raspi/w1.js').default(setValue, id, interval);
    else if (__NODE__) emulateTempSensor(setValue, interval);
  }

  render() {
    const { children, getValue, name } = this.props;
    return children && children(getValue(name));
  }
}

export default RoTHOC(W1TempSensor);
