import React, { Component, PropTypes } from "react";
import RoTHOC from 'rot/hocs/rot-hoc';

//<RoT name="name" value="value">{(value, data) => {}}</RoT>

class RoT extends Component {
  constructor(props) {
    super(props);
    const { value, setValue } = props;
    if (__NODE__ && value !== undefined) setValue(value);
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    children: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    getCollection: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
  };

  render() {
    const { children, getValue, getCollection, getData, name } = this.props;
    return children && typeof children === 'function' && children(getValue(name), getCollection(name), getData(name)) || null
  }
}

export default RoTHOC(RoT);