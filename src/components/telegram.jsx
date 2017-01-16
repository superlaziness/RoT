import React, { Component } from "react";
import RoTHOC from 'components/hocs/rot';

class TelegramBot extends Component {
  constructor(props) {
    super(props);
    if (__NODE__) props.once(require('components/telegrambot.js').default, 'telegramBot')(this.props.getValue);
  }

  render() {
    return null
  }
}

export default RoTHOC(TelegramBot);