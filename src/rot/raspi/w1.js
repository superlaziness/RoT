import sensor from 'ds18x20';

let oldTemp = 0;

const w1 = (onChange, id, interval) => {
  const isLoaded = sensor.isDriverLoaded();
  if (!isLoaded) return console.error('RoT Error: 1-Wire driver is not loaded');
  // sensor.list((err, listOfDeviceIds) => {
  //   console.log('1-wire sensors list', listOfDeviceIds);
  // });
  setInterval(() => {
    sensor.get(id, (err, temp) => {
      if (err) {
        console.error('RoT Error: w1 temp sensor', err);
      } else if (temp !== oldTemp) {
        onChange(temp);
        oldTemp = temp;
      }
    });
  }, interval);
};

export default w1;
