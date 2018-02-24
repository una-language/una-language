const { List } = require('immutable')

function SovaList(input) {
  Object.defineProperty(this, 'list', {
    value: List.isList(input) ? input : List(input),
    configurable: false,
    enumerable: true,
    writable: false
  })
  this.list.forEach((element, index) => {
    Object.defineProperty(this, index, {
      value: element,
      configurable: false,
      enumerable: false,
      writable: false
    })
  })

  this[Symbol.iterator] = function() {
    return this.list[Symbol.iterator]()
  }
}

SovaList.prototype.toString = function() {
  const elements = this.list.map(element => element.toString()).join(', ')
  return `[${elements}]`
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

  Object.defineProperty(SovaList.prototype, name, {
    [getter ? 'get' : 'value']: value
  })
}

method('add', 'push')
method('addFirst', 'unshift')
method('addLast', 'push')
method('addList', 'concat')
method('beginning', 'pop', true)
method('contains', 'includes')
method('count', 'count')
method('countBy', 'countBy')
method('drop', 'skip')
method('dropRight', 'skipLast')
method('dropWhile', 'skipWhile')
method('dropUntil', 'skipUntil')
method('empty', 'isEmpty', true)
method('exists', 'some')
method('filter', 'filter')
method('filterNot', 'filterNot')
method('find', 'find')
method('findLast', 'findLast')
method('findIndex', 'findIndex')
method('findLastIndex', 'findLastIndex')
method('flatMap', 'flatMap')
method('flatten', 'flatten', true)
method('forAll', 'every')
method('forEach', 'forEach')
method('get', 'get')
method('groupBy', 'groupBy')
method('head', 'first', true)
method('indexOf', 'indexOf')
method('insertAt', 'insert')
method('last', 'last', true)
method('lastIndexOf', 'lastIndexOf')
method('length', 'size', true, true)
method('makeString', 'join')
method('map', 'map')
method('max', 'max')
method('maxBy', 'maxBy')
method('min', 'min')
method('minBy', 'minBy')
method('reduce', 'reduce')
method('reduceRight', 'reduceRight')
method('removeAt', 'delete')
method('reverse', 'reverse', true)
method('size', 'size', true, true)
method('slice', 'slice')
method('sort', 'sort')
method('sortBy', 'sortBy')
method('tail', 'shift', true)
method('take', 'take')
method('takeRight', 'takeLast')
method('takeWhile', 'takeWhile')
method('takeUntil', 'takeUntil')
method('toJS', 'toJS', true)
method('toJSON', 'toJSON', true)
method('update', 'update')
method('updateAt', 'set')
method('zip', 'zip')
method('zipAll', 'zipAll')
method('zipWith', 'zipWith')

Array.prototype.toSova = function() {
  return new SovaList(this)
}

module.exports = (...elements) => new SovaList(elements)
