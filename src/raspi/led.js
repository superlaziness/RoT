import gpio from 'gpio';

const lastValue = 0;

const led = (value) => {
  if (value !== lastValue) {
    const gpio26 = gpio.export(26, { ready: () => {
      gpio26.set(value, () => {
        console.log('led changed', gpio26.value);
        lastValue = value;
      });
    }});
  }
}

export default led;