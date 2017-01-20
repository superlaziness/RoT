import rpio from 'rpio';

let lastValue = 0;

const digitalOutput = (value, pin) => {
  if (value !== lastValue) {
    rpio.open(pin, rpio.OUTPUT, rpio.PULL_UP);
    rpio.write(pin, value ? rpio.HIGH : rpio.LOW);
    lastValue = value;
  }
};

export default digitalOutput;
