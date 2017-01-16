import * as c from '../constants';

export function setValueAction(value, name, data) {
  return {
    type: c.SET_VALUE, 
    socket: true,
    value,
    name,
    data,
  };
};

export function registerAction(name, data) {
  return {
    type: c.REGISTER,
    socket: true,
    name,
    data,
  }
}

export function getValueAction(name) {
  return (dispatch, getState) => {
    const device = getState().rotReducer.things[name];
    if (device) return device.value;
    else console.log(`error getting value of ${name} device`);
  }
}

export function getDataAction(name) {
  return (dispatch, getState) => {
    const device = getState().rotReducer.things[name];
    if (device) return device.data;
    else console.log(`error getting data of ${name} device`);
  }
}