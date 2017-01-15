import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "actions/testActions";

class RotComponent extends Component {
  constructor(props) {
    super(props);
  }

  changeValue = (value) => {
    this.props.setValue(value);
  }

}

export default connect (state => {( rotState: state.testReduser )}, actions)(RotComponent);