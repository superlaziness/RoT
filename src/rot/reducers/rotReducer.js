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
  return { ...obj, ...updatedObject };
};

const updateCollection = (value, device) => {
  if (!value) return false;
  if (!device.data || !device.data.collect) return false;
  const collection = device.collection ? device.collection.slice() : [];
  collection.push(value);
  if (collection.length > device.data.collect) collection.splice(0, 1);
  return collection;
};

const validatedValue = (value, validation) => {
  if (!validation || validation.length < 2) return value;
  if (value < validation[0]) return validation[0];
  if (value > validation[1]) return validation[1];
  return value;
}

const defaultState = {
  things: {},
  groups: {},
  devices: {},
};

export default function rotReducer(state = defaultState, a) {
  switch (a.type) {
    case c.SET_VALUE: {
      const data = a.data || state.things[a.name] && state.things[a.name].data;
      return {
        ...state,
        things: updateObject(
          state.things,
          a.name,
          {
            value: validatedValue(a.value, state.things[a.name].data.validate),
            data,
            collection: updateCollection(a.value, state.things[a.name])
              || state.things[a.name].collection
              || [],
          },
        ),
      };
    }

    case c.REGISTER: {
      return {
        ...state,
        things: updateObject(
          state.things,
          a.name,
          {
            value: state.things[a.name] && state.things[a.name].value || a.data.defaultValue || (a.data.validate && a.data.validate[0]) || 0,
            data: a.data,
            collection: state.things[a.name] && state.things[a.name].collection || [],
          },
        ),
      };
    }

    default:
      return state;
  }
}
