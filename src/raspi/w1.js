import sensor from 'ds18x20';

const w1 = (onChange, id) => {
  const isLoaded = sensor.isDriverLoaded();
  if (!isLoaded) return console.log('1-Wire driver is not loaded');
  // sensor.list((err, listOfDeviceIds) => {
  //   console.log('1-wire sensors list', listOfDeviceIds);
  // });
  sensor.get(id, (err, temp) => {
    if (err) {
      console.error(err);
    } else {
      onChange(temp);
    }
  });
}

export default w1;