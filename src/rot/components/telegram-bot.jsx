import { Component, PropTypes } from 'react';
import RoTHOC from 'rot/hocs/rot-hoc';

// <TelegramBot />

class TelegramBot extends Component {
  static propTypes = {
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (__NODE__) {
      require('rot/node/telegrambot.js').default(
        this.props.getValue,
        this.props.getList,
        this.props.setValue
      );
    }
  }

  render() {
    return null;
  }
}

export default RoTHOC(TelegramBot);
