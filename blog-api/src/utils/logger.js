const getTimestamp = () => {
  return new Date().toISOString();
};

const info = (message) => {
  console.log(`[${getTimestamp()}] INFO: ${message}`);
};

const error = (message) => {
  console.error(`[${getTimestamp()}] ERROR: ${message}`);
};

module.exports = {
  info,
  error,
};