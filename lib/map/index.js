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

const method = (name, oldName, getter = false, oldGetter = false) => {
  const value = function() {
    const result = oldGetter ? this.list[oldName] : this.list[oldName](...arguments)
    return List.isList(result) ? new SovaList(result) : result
  }

  // Generating documentation
  // const type = getter ? 'Getter' : 'Method'
  // const documentationLine = `${type} <i>${name}</i> is alias for [${oldName}](https://facebook.github.io/immutable-js/docs/#/List/${oldName}) </br>`
  // console.log(documentationLine)

  Object.defineProperty(SovaMap.prototype, name, {
    [getter ? 'get' : 'value']: value
  })
}

method('contains', 'includes')
method('containsKey', 'has')
method('count', 'count')
method('countBy', 'countBy')
method('empty', 'isEmpty', true)
method('exists', 'exists')
method('filter', 'filter')
method('filterNot', 'filterNot')
method('find', 'find')
method('flatMap', 'flatMap')
method('flipped', 'flip', true)
method('forAll', 'forAll')
method('forEach', 'forEach')
method('get', 'get')
method('keyOf', 'keyOf')
method('makeString', 'join')
method('map', 'map')
method('mapKeys', 'mapKeys')
method('merge', 'merge')
method('mergeDeep', 'merge')
method('size', 'size', true, true)
method('remove', 'delete')
method('removeMany', 'deleteAll')
method('reverse', 'reverse', true)
method('sort', 'sort')
method('sortBy', 'sortBy')
method('groupBy', 'groupBy')
method('update', 'update')
method('updateAt', 'set')
method('toJS', 'toJS', true)
method('toJSON', 'toJSON', true)

module.exports = input => new SovaMap(input)
