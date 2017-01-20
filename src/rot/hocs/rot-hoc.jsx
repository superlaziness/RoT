import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/rotActions';

const ConnectHOC = connect(state => ({ rotState: state.rotReducer }), actions);
const onceObj = {};

const RoTHOC = (WrappedComponent, deviceProps = {}) => {
  const RoTComponent = class extends Component {

    constructor(props) {
      super(props);
      this.name = props.name || deviceProps.name;
      this.data = props.data || deviceProps.data;
      if (__NODE__ && this.name && this.data) this.once(this.register, `${this.name}:register`)();
    }

    static propTypes = {
      name: PropTypes.string,
      data: PropTypes.shape({
        description: PropTypes.string,
        validate: PropTypes.array,
        unit: PropTypes.string,
      }),
      setValueAction: PropTypes.func.isRequired,
      getValueAction: PropTypes.func.isRequired,
      getDataAction: PropTypes.func.isRequired,
    }

    register = () => {
      console.log(`RoT: registered device ${this.name}`);
      this.props.registerAction(this.name, this.data);
    }

    setValue = (value, n = this.name, d = this.data) => {
      if (n) this.props.setValueAction(value, n, d);
    }

    getValue = (n = this.name) => {
      return this.props.getValueAction(n);
    }

    getCollection = (n = this.name) => {
      return this.props.getCollectionAction(n);
    }

    getData = (n = this.name) => {
      return this.props.getDataAction(n);
    }

    getList = () => {
      return this.props.getListAction();
    }

    once = (func, n = this.name) => {
      if (!onceObj[n]) {
        onceObj[n] = true;
        return func;
      } else return () => {};
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          setValue={this.setValue}
          getValue={this.getValue}
          getCollection={this.getCollection}
          getData={this.getData}
          getList={this.getList}
          once={this.once}
          name={this.name}
          data={this.data}
        />
      );
    }
  };

  return ConnectHOC(RoTComponent);
};

export default RoTHOC;
