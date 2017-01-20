import * as c from '../constants';

export function setValueAction(value, name, data) {
  return {
    type: c.SET_VALUE,
    socket: true,
    value,
    name,
    data,
  };
}

export function registerAction(name, data) {
  return {
    type: c.REGISTER,
    socket: true,
    name,
    data,
  };
}
