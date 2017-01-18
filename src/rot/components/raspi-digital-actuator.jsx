import React, { Component, PropTypes } from "react";
import RoTHOC from 'rot/hocs/rot-hoc';

//<RaspiDigitalActuator name="name" data={dataObj} pin={gpio-pin-num} value={bool}/>

let lastValue = false;

class RaspiDigitalActuator extends Component {
  constructor(props) {
    super(props);
    const { getValue, name, pin, value } = props;
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.shape({
      description: PropTypes.string,
      validate: PropTypes.array,
      unit: PropTypes.string,
    }),
    value: PropTypes.number,
    pin: PropTypes.number.isRequired,
    children: PropTypes.func,
    getValue: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    const { value, getValue, pin } = nextProps;
    if (__RASPI__) require('rot/raspi/digital-output.js').default(getValue(name), pin);
    if (__NODE__ && (value !== undefined)) this.handleSetValue(nextProps);
  };

  handleSetValue = (nextProps) => {
    const { value, setValue } = nextProps;
    if (this.props.value !== value) setValue(value);
  }

  render() {
    const { children, getValue, name } = this.props;
    return children && children(getValue(name)) || null
  }
}

export default RoTHOC(RaspiDigitalActuator);