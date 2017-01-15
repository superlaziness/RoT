import React from "react";
import { connect } from "react-redux";
import * as actions from "actions/testActions";

const RoTHOC = WrappedComponent => (
  connect(state => ({ rotState: state.testReducer }), actions)(WrappedComponent)
);

export default RoTHOC;