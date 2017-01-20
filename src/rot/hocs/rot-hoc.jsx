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
      rotState: PropTypes.shape({
        things: PropTypes.object.isRequired,
      }).isRequired,
      setValueAction: PropTypes.func.isRequired,
      registerAction: PropTypes.func.isRequired,
    };

    static defaultProps = {
      name: null,
      data: null,
    }

    register = () => {
      if (__NODE__) process.stdout.write(`RoT: registered device ${this.name} \n`);
      this.props.registerAction(this.name, this.data);
    }

    setValue = (value, n = this.name, d = this.data) => {
      if (n) this.props.setValueAction(value, n, d);
    }

    getValue = (n = this.name) => {
      const thing = this.props.rotState.things[n];
      return thing && thing.value;
    }

    getCollection = (n = this.name) => {
      const thing = this.props.rotState.things[n];
      return thing && thing.collection;
    }

    getData = (n = this.name) => {
      const thing = this.props.rotState.things[n];
      return thing && thing.data;
    }

    getList = () => {
      return Object.keys(this.props.rotState.things);
    }

    once = (func, n = this.name) => {
      if (!onceObj[n]) {
        onceObj[n] = true;
        return func;
      }
      return () => {};
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
