import { Component, PropTypes } from 'react';
import RoTHOC from 'rot/hocs/rot-hoc';

// <RoT name="name" value="value">{(value, data) => {}}</RoT>

class RoT extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    children: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    getCollection: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    children: null,
  }

  componentWillReceiveProps(nextProps) {
    const { value, setValue } = nextProps;
    if (__NODE__ && value !== undefined && value !== this.props.value) setValue(value);
  }

  render() {
    const { children, getValue, getCollection, getData, name } = this.props;
    return children && typeof children === 'function' && children(getValue(name), getCollection(name), getData(name));
  }
}

export default RoTHOC(RoT);
