import rpio from 'rpio';

const encoder = (callback, pinCW, pinCCW) => {
  const options = {
    gpiomem: false,
  };

  rpio.init(options);
  rpio.open(pinCW, rpio.INPUT);
  rpio.open(pinCCW, rpio.INPUT);

  const handler = (pin) => {
    if (pin === pinCW) return callback('+');
    if (pin === pinCCW) return callback('-');
    return false;
  };

  rpio.poll(pinCW, handler, rpio.POLL_HIGH);
  rpio.poll(pinCCW, handler, rpio.POLL_HIGH);
}

export default encoder;