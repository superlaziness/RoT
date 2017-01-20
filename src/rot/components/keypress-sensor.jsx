import { Component, PropTypes } from 'react';
import RoTHOC from 'rot/hocs/rot-hoc';

// <KeypressSensor name="name" data={dataObj} />

class KeypressSensor extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
  };

  static defaultProps = {
    children: null,
  }

  componentDidMount() {
    if (__NODE__) require('rot/node/keyboardpress.js').default(this.handleKeyPress);
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

export default RoTHOC(KeypressSensor);
