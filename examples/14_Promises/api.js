require("sova-standard-library");
module.exports = Sova.map({
  sendMessage: function(message) {
    return new Promise(function(resolve) {
      return resolve(`message ${message}`);
    });
  },
  processResponse: function(response) {
    return new Promise(function(resolve) {
      return resolve(`response ${response}`);
    });
  },
  fixResult: function(result) {
    return new Promise(function(resolve) {
      return resolve(`result ${result}`);
    });
  }
});
