import { Component, PropTypes } from 'react';
import RoTHOC from 'rot/hocs/rot-hoc';

// <EncoderSensor name="name" data={dataObj} pinCW={num} pinCCW={num} />

class EncoderSensor extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    pinCW: PropTypes.number.isRequired,
    pinCCW: PropTypes.number.isRequired,
  };

  static defaultProps = {
    children: null,
  }

  componentDidMount() {
    const { pinCW, pinCCW } = this.props;
    if (__RASPI__) require('rot/raspi/encoder.js').default(this.handleKeyPress, pinCW, pinCCW);
  }

  handleKeyPress = (key) => {
    const { getValue, setValue, name } = this.props;
    const value = getValue(name);
    const newValue = key === '+' ? value + 1 : value - 1;
    setValue(newValue);
  };

  render() {
    const { children, getValue, name } = this.props;
    return children && children(getValue(name));
  }
}

export default RoTHOC(EncoderSensor);
