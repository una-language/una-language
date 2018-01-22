const sendMessage = message =>
  new Promise(resolve => resolve(`message ${message}`));

const processResponse = response =>
  new Promise(resolve => resolve(`response ${response}`));

const fixResult = result => new Promise(resolve => resolve(`result ${result}`));

module.exports = {
  sendMessage,
  processResponse,
  fixResult
};
