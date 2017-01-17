import React, { Component, PropTypes } from "react";
import RoTHOC from 'rot/hocs/rot-hoc';

//<TelegramBot />

class TelegramBot extends Component {
  constructor(props) {
    super(props);
    if (__NODE__) props.once(require('rot/node/telegrambot.js').default, 'telegramBot')
      (this.props.getValue, this.props.setValue);
  };

  static propTypes = {
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    once: PropTypes.func.isRequired,
  };

  render() {
    return null
  }
}

export default RoTHOC(TelegramBot);