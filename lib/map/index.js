const { Map } = require('immutable')

function SovaMap(input) {
  Object.defineProperty(this, 'object', {
    value: Map.isMap(input) ? input : Map(input),
    configurable: false,
    enumerable: false,
    writable: false
  })
  this.object.map((value, key) => {
    Object.defineProperty(this, key, {
      value,
      configurable: false,
      enumerable: true,
      writable: false
    })
  })
}

SovaMap.prototype.toString = function() {
  const elements = this.object
    .map((value, key) => {
      return `${key} : ${value}`
    })
    .join(', ')

  return `{${elements}}`
}

const getter = (name, getter) => {
  Object.defineProperty(SovaMap.prototype, name, {
    get: function() {
      return getter(this.object)
    }
  })
}

const method = (name, method) => {
  Object.defineProperty(SovaMap.prototype, name, {
    value: function() {
      return method(this.object, ...arguments)
    }
  })
}

method('map', (object, mapper) => new SovaMap(object.map(mapper)))
getter('toJS', map => map.toJS())

module.exports = input => new SovaMap(input)
