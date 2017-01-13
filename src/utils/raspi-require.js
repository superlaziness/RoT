export default function raspiRequire(module) {
  if (process.arch === 'arm') return require(module);
  return false;
};