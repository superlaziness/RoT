const sensor = require('ds18x20');

var isLoaded = sensor.isDriverLoaded();
if (!isLoaded) console.log('Driver is not loaded');

sensor.list(function (err, listOfDeviceIds) {
  console.log('w1 list', listOfDeviceIds);
});

sensor.get('10-0008024f9ea9', function (err, tempObj) {
    console.log('w1 temp', tempObj);
});

var gpio = require("gpio");

var gpio26 = gpio.export(26, { ready: function() {
  gpio26.set(function() {
    console.log(gpio26.value); 
  });
}});