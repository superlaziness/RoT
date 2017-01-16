import * as c from '../constants';

/* --- state prototype
{
  things: {
    bathroom: {
      temp: {
        value: 26.5,
        description: 'Temperature sensor',
        lastUpdate: 2017-01-15T20:33:36,
        updatePeriod: 10000,
        unit: 'С',
        validate: [-100, 100],
      },
      requiredTemp: {
        value: 24,
        description: 'Required temperature encoder',
        lastUpdate: 2017-01-15T20:33:36,
        updatePeriod: false,
        unit: 'C',
        validate: [15, 40],
      },
      heating: {
        value: 0,
        description: 'Heating actuator',
        lastUpdate: 2017-01-15T20:33:36,
        updatePeriod: false,
        unit: false,
        validate: 'boolean',
      }
    }
  }
}


   --- */

const updateObject = (obj = {}, name, value) => {
  const updatedObject = {};
  updatedObject[name] = value;
  return { ...obj, ...updatedObject }
};

const defaultState = {
  things: {},
  groups: {},
  devices: {},
};

export default function rotReducer(state = defaultState, a) {
  switch (a.type) {
    case c.SET_VALUE:
      return { 
        ...state, 
        things: updateObject(
          state.things, a.group, updateObject(
            state.things[a.group], 
            a.name, 
            {value: a.value, data: a.data}
          )
        ),
      };

    case c.INCREASE_VALUE:
      return {
        ...state,
        things: updateObject(
          state.things, a.group, updateObject(
            state.things[a.group],
            a.name,
            {value: state.things[a.group] && state.things[a.group][a.name] && state.things[a.group][a.name].value + 1 || 1, data: a.data}
          )
        )
      };

    case c.DECREASE_VALUE:
      return {
        ...state,
        things: updateObject(
          state.things, a.group, updateObject(
            state.things[a.group],
            a.name,
            {value: state.things[a.group] && state.things[a.group][a.name] && state.things[a.group][a.name].value - 1 || -1, data: a.data}
          )
        )
      };

    default:
      return state;
  }
}