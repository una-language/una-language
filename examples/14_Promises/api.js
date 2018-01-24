require("sova-standard-library");
module.exports = Sova.map({
  sendMessage: function(message) {
    return Sova.createInstance(
      Sova.isFunctionWithoutArguments(Promise) ? Promise() : Promise,
      function(resolve) {
        return resolve(`message ${message}`);
      }
    );
  },
  processResponse: function(response) {
    return Sova.createInstance(
      Sova.isFunctionWithoutArguments(Promise) ? Promise() : Promise,
      function(resolve) {
        return resolve(`response ${response}`);
      }
    );
  },
  fixResult: function(result) {
    return Sova.createInstance(
      Sova.isFunctionWithoutArguments(Promise) ? Promise() : Promise,
      function(resolve) {
        return resolve(`result ${result}`);
      }
    );
  }
});
