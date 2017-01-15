import React, { Component } from "react";

const raspiListeners = {};

const raspiHOC = (WrappedComponent, name = 'default') => {

  const throwError = (func) => {
    return () => {
      console.log(`RoT: listener already running`);
    }
  }

  const raspiListener = (func) => {
    if (!raspiListeners[name]) {
      raspiListeners[name] = true;
      return func;
    } else return throwError(func);
  };

  return class extends Component {
    render() {
      return (
        <WrappedComponent 
          raspiListener={raspiListener} 
          name={name} 
        />
      )
    }
  };
};

export default raspiHOC;