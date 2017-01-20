import fs from 'fs';

const PiStats = (function () {
  const memInfo = {};
  const currentCPUInfo = { total: 0, active: 0 };
  const lastCPUInfo = { total: 0, active: 0 };

  function getValFromLine(line) {
    const match = line.match(/[0-9]+/gi);
    if (match !== null) {
      return parseInt(match[0], 10);
    }
    return null;
  }

  const getMemoryInfo = function (cb) {
    fs.readFile('/proc/meminfo', 'utf8', (err, data) => {
      if (err) {
        cb(err);
        return;
      }
      const lines = data.split('\n');
      memInfo.total = Math.floor(getValFromLine(lines[0]) / 1024);
      memInfo.free = Math.floor(getValFromLine(lines[1]) / 1024);
      memInfo.cached = Math.floor(getValFromLine(lines[3]) / 1024);
      memInfo.used = memInfo.total - memInfo.free;
      memInfo.percentUsed = Math.ceil(((memInfo.used - memInfo.cached) / memInfo.total) * 100);

      cb(null, memInfo);
    });
  };

  const calculateCPUPercentage = function (oldVals, newVals) {
    const totalDiff = newVals.total - oldVals.total;
    const activeDiff = newVals.active - oldVals.active;
    return Math.ceil((activeDiff / totalDiff) * 100);
  };

  const getCPUInfo = function (cb) {
    lastCPUInfo.active = currentCPUInfo.active;
    lastCPUInfo.idle = currentCPUInfo.idle;
    lastCPUInfo.total = currentCPUInfo.total;

    fs.readFile('/proc/stat', 'utf8', (err, data) => {
      if (err) {
        if (cb !== undefined) {
          cb(err);
        }
        return;
      }
      const lines = data.split('\n');
      const cpuTimes = lines[0].match(/[0-9]+/gi);
      currentCPUInfo.total = 0;
      // We'll count both idle and iowait as idle time
      currentCPUInfo.idle = parseInt(cpuTimes[3], 10) + parseInt(cpuTimes[4], 10);
      for (let i = 0; i < cpuTimes.length; i++) {
        currentCPUInfo.total += parseInt(cpuTimes[i], 10);
      }
      currentCPUInfo.active = currentCPUInfo.total - currentCPUInfo.idle;
      currentCPUInfo.percentUsed = calculateCPUPercentage(lastCPUInfo, currentCPUInfo);

      if (cb !== undefined) {
        cb(null, currentCPUInfo);
      }
    });
  };

  return {
    getMemoryInfo,
    getCPUInfo,
  };
}());

const stats = (onChange, interval = 1000) => {
  setInterval(() => {
    PiStats.getCPUInfo((CPUerr, CPUdata) => {
      PiStats.getMemoryInfo((MEMerr, MEMdata) => {
        onChange({ cpu: CPUerr, memory: MEMerr }, { cpu: CPUdata, memory: MEMdata });
      });
    });
  }, interval);
};

export default stats;
