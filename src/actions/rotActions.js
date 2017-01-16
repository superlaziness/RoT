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