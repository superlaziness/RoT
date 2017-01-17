import React, { Component, PropTypes } from "react";
import RoTHOC from 'rot/hocs/rot-hoc';

//<KeypressSensor name="name" data={dataObj} />

class KeypressSensor extends Component {
  constructor(props) {
    super(props);
    if (__NODE__) props.once(require('rot/node/keyboardpress.js').default)(this.handleKeyPress);
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.shape({
      description: PropTypes.string,
      validate: PropTypes.array,
      unit: PropTypes.string,
    }),
    children: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    once: PropTypes.func.isRequired,
  };

  handleKeyPress = (key) => {
    const { getValue, setValue, name } = this.props;
    const value = getValue(name);
    const newValue = key === '+' ? value + 1 : value - 1;
    setValue(newValue);
  };

  render() {
    const { children, getValue, name } = this.props;
    return children && children(getValue(name)) || null
  }
}

export default RoTHOC(KeypressSensor);