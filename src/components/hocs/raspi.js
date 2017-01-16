import React, { Component } from "react";

const raspiListeners = {};

const raspiHOC = WrappedComponent => {

  const throwError = (func) => {
    return () => {
      console.log(`RoT: listener already running`);
    }
  }

  const raspiListener = (func, name) => {
    console.log('Listener', name);
    if (!raspiListeners[name]) {
      raspiListeners[name] = true;
      return func;
    } else return throwError(func);
  };

  return class extends Component {

    render() {
      return (
        <WrappedComponent 
          {...this.props}
          raspiListener={raspiListener} 
        />
      )
    }
  };
};

export default raspiHOC;