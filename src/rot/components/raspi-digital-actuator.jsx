import { Component, PropTypes } from 'react';
import RoTHOC from 'rot/hocs/rot-hoc';

// <RaspiDigitalActuator name="name" data={dataObj} pin={gpio-pin-num} value={bool}/>

class RaspiDigitalActuator extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    pin: PropTypes.number.isRequired,
    children: PropTypes.func,
    getValue: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: null,
    children: null,
  };

  componentWillReceiveProps(nextProps) {
    const { value, getValue, name, pin } = nextProps;
    if (__RASPI__) require('rot/raspi/digital-output.js').default(getValue(name), pin);
    if (__NODE__ && (value !== undefined)) this.handleSetValue(nextProps);
  }

  handleSetValue = (nextProps) => {
    const { value, setValue } = nextProps;
    if (this.props.value !== value) setValue(value);
  }

  render() {
    const { children, getValue, name } = this.props;
    return children && children(getValue(name));
  }
}

export default RoTHOC(RaspiDigitalActuator);
