import React, { Component } from "react";

import {
  KeypressSensor,
  RaspiDigitalActuator,
  TelegramBot,
  W1TempSensor,
  RoT,
} from 'rot/components';

import ProgressBar from "components/progressbar";

const tempData = {
  description: 'Temperature sensor',
  validate: [-100, 100],
  unit: 'C',
}

const reqTempData = {
  description: 'Required temperature',
  validate: [0, 50],
  unit: 'C',
}

const heatingData = {
  description: 'Heating actuator',
}

class Maco extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div>
        <h1>RoT Preview</h1>
        <h2><RoT name="temp">{(val) => (<span>{val}</span>)}</RoT> C <RoT name="heating">{(val) => (<span>{val ? 'heating' : ''}</span>)}</RoT></h2>  
        <RoT name="reqTemp">{(val) => (<ProgressBar value={val}/>)}</RoT>
        {/*<Encoder/>*/}
        <KeypressSensor name="reqTemp" data={reqTempData} />
        <TelegramBot/>
        <W1TempSensor name="temp" id="10-0008024f9ea9" interval={10000} data={tempData}>
          {(temp) => {
            const heating = temp < 30 ? 1 : 0;
            return (
              <RaspiDigitalActuator name="heating" data={heatingData} value={heating} pin={37}/>
            )
          }}
        </W1TempSensor>
      </div>
    );
  }
};

export default Maco;