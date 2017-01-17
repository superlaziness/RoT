import React, { Component } from 'react';
import { RoT } from 'rot/components';

import { LineChart, Line } from 'recharts';

const CpuChart = () => (
  <RoT name="raspiStats">
    {(stats, collection) => {
      if (!collection) return null;
      const cpuData = collection.map((data, i) => ({
        name: i,
        cpu: data.cpu.percentUsed,
        memory: data.memory.percentUsed
      }));

      return (
        <LineChart width={200} height={100} data={cpuData}>
          <Line type="monotone" isAnimationActive={false} dataKey="cpu" stroke="#EC5900" dot={false} strokeWidth={2}/>
          <Line type="monotone" isAnimationActive={false} dataKey="memory" stroke="#F2C94C" dot={false} strokeWidth={2}/>
        </LineChart>
      )
    }}
  </RoT>
);

export default CpuChart