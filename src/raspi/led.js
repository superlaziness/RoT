import rpio from 'rpio';

let lastValue = 0;

const led = (value) => {
  if (value !== lastValue) {
    rpio.open(37, rpio.OUTPUT, rpio.PULL_UP);
    rpio.write(37, value ? rpio.HIGH : rpio.LOW);
    lastValue = value;
  }
}

export default led;