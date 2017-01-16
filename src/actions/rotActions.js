import * as c from '../constants';

export function changeValue(value, group, name, data) {
  return {
    type: c.SET_VALUE, 
    socket: true,
    value,
    group,
    name,
    data,
  };
};

export function increaseValue(group, name, data) {
  return {
    type: c.INCREASE_VALUE, 
    socket: true,
    group,
    name,
    data,
  };
};

export function decreaseValue(group, name, data) {
  return {
    type: c.DECREASE_VALUE, 
    socket: true,
    group,
    name,
    data,
  };
};