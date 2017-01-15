import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "actions/testActions";

const withRotProps = WrappedComponent => (
  connect(state => ({ rotState: state.testReducer }), actions)(WrappedComponent)
);

export default withRotProps;