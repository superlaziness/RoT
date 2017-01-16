import { EventEmitter } from 'events';
import { Gpio } from 'onoff';
import { DigitalInput, PULL_UP, PULL_DOWN, PULL_NONE } from 'raspi-gpio';
import { getPins } from 'raspi-board';

const raspi = require('raspi');

function encoder(action) {
  raspi.init(() => {
    const encoder = new Encoder();

    encoder.addListener('change', (val) => {
      console.log('changed', val);
      action(val);
    });
  });
};

function resolveWiringPiToGPIO(wiringPiPin) {
  try {
    return getPins()[wiringPiPin].pins.find( p => /GPIO/.test(p) ).replace('GPIO', '')
  } catch (e) {
    console.error('Cannot find GPIO number for pin: ', wiringPiPin);
    throw e;
  }
}

const INPUT = 'in';
const EDGE_BOTH = 'both';

class Encoder extends EventEmitter {
  constructor(config = {a: {pin: 'P1-15'}, b: {pin: 'P1-16'}}) {
    super();

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleInterrupt = this.handleInterrupt.bind(this);

    const a = new DigitalInput(config.a);
    const b = new DigitalInput(config.b);

    const aGpioNum = resolveWiringPiToGPIO(a.pins[0]);
    const bGpioNum = resolveWiringPiToGPIO(b.pins[0]);

    this.aPin = new Gpio(aGpioNum, INPUT, EDGE_BOTH);
    this.bPin = new Gpio(bGpioNum, INPUT, EDGE_BOTH);

    this.a = a;
    this.b = b;

    this.value = 0;

    this.aPin.watch(this.handleInterrupt);
    this.bPin.watch(this.handleInterrupt);
  }

  handleInterrupt() {
    this.handleUpdate(this.a.read(), this.b.read());
  }

  handleUpdate(a, b) {
    let changed = false;
    if (a === 0 && b === 1) {
      this.value++;
      changed = true;
    };
    if (a === 1 && b === 0) {
      this.value--;
      changed = true;
    };

    console.log('encoder', this.value);

    if (changed) this.emit('change', this.value);
  }
};

export default encoder;

