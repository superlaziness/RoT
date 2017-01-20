import React from 'react';

import {
  KeypressSensor,
  RaspiDigitalActuator,
  TelegramBot,
  W1TempSensor,
  RoT,
  RaspiStats,
  EncoderSensor,
} from 'rot/components';

import ProgressBar from 'components/progressbar';
import CpuChart from 'components/cpu-chart';

const tempData = {
  description: 'Temperature sensor',
  validate: [-100, 100],
  unit: 'C',
  collect: 10,
};

const reqTempData = {
  description: 'Required temperature',
  validate: [0, 50],
  unit: 'C',
};

const heatingData = {
  description: 'Heating actuator',
};

const Maco = () => (
  <div>
    <h1>RoT Preview</h1>
    <h2><RoT name="temp">{(val) => (<span>{val}</span>)}</RoT> C <RoT name="heating">{(val) => (<span>{val ? 'heating' : ''}</span>)}</RoT></h2>
    <RoT name="raspiStats">
      {(stats) => {
        const cpu = stats && stats.cpu && stats.cpu.percentUsed;
        const memory = stats && stats.memory && stats.memory.percentUsed;
        return (
          <div>
            <h2>CPU: {cpu}%</h2>
            <h2>Memory: {memory}%</h2>
          </div>
        );
      }}
    </RoT>
    <CpuChart />

    {/* <Encoder/>*/}
    <EncoderSensor name="reqTemp" data={reqTempData} pinCW={15} pinCCW={16} />
    <KeypressSensor name="reqTemp" />
    <TelegramBot />
    <RaspiStats />
    <RoT name="reqTemp">{(reqTemp) => (
      <div>
        <ProgressBar value={reqTemp} />
        <W1TempSensor name="temp" id="10-0008024f9ea9" interval={10000} data={tempData}>
          {(temp) => {
            const heating = temp < reqTemp ? 1 : 0;
            return (
              <RaspiDigitalActuator name="heating" data={heatingData} value={heating} pin={37} />
            );
          }}
        </W1TempSensor>
      </div>
    )}</RoT>

  </div>
);

export default Maco;
