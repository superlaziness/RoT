import React, { Component } from "react";
import raspiHOC from 'components/hocs/raspi';

class TelegramBot extends Component {
  constructor(props) {
    super(props);
    if (__NODE__) props.raspiListener(require('components/telegrambot.js').default, 'telegramBot')(this.props.getValue);
  }

  render() {
    return null
  }
}

export default raspiHOC(TelegramBot);