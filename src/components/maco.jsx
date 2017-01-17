import React, { Component } from "react";

import {
  KeypressSensor,
  RaspiDigitalActuator,
  TelegramBot,
  W1TempSensor,
  RoT,
  RaspiStats,
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
        <h2>Cpu: <RoT name="raspiStats">{(val) => (<span>{val && val.cpu && val.cpu.percentUsed}</span>)}</RoT>%</h2>
        <h2>Memory: <RoT name="raspiStats">{(val) => (<span>{val && val.cpu && val.memory.percentUsed}</span>)}</RoT>%</h2>
        
        {/*<Encoder/>*/}
        <KeypressSensor name="reqTemp" data={reqTempData} />
        <TelegramBot/>
        <RaspiStats/>
        <RoT name="reqTemp">{(reqTemp) => (
          <div>
            <ProgressBar value={reqTemp}/>
            <W1TempSensor name="temp" id="10-0008024f9ea9" interval={10000} data={tempData}>
              {(temp) => {
                const heating = temp < reqTemp ? 1 : 0;
                return (
                  <RaspiDigitalActuator name="heating" data={heatingData} value={heating} pin={37}/>
                )
              }}
            </W1TempSensor>
          </div>
        )}</RoT>
          
      </div>
    );
  }
};

export default Maco;