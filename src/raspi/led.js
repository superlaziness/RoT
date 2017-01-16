import rpio from 'rpio';

const lastValue = 0;

const led = (value) => {
  if (value !== lastValue) {
    rpio.open(37, rpio.OUTPUT, rpio.PULL_UP);
    rpio.write(37, value ? rpio.HIGH : rpio.LOW);
  }
}

export default led;