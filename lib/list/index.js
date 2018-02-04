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

const getter = (name, getter) => {
  Object.defineProperty(SovaList.prototype, name, {
    get: function() {
      return getter(this.list)
    }
  })
}

const method = (name, method) => {
  Object.defineProperty(SovaList.prototype, name, {
    value: function() {
      return method(this.list, ...arguments)
    }
  })
}

method('add', (list, element) => new SovaList(list.push(element)))
method('addFirst', (list, element) => new SovaList(list.unshift(element)))
method('addLast', (list, element) => new SovaList(list.push(element)))
method('drop', (list, count) => new SovaList(list.skip(count)))
method('dropRight', (list, count) => new SovaList(list.skipLast(count)))
method('dropWhile', (list, condition) => new SovaList(list.skipWhile(condition)))
method('dropUntil', (list, condition) => new SovaList(list.skipUntil(condition)))
method('exists', (list, condition) => list.some(condition))
method('filter', (list, condition) => new SovaList(list.filter(condition)))
method('forAll', (list, condition) => list.every(condition))
method('get', (list, index) => list.get(index))
getter('head', list => list.first())
getter('length', list => list.size)
method('map', (list, mapper) => new SovaList(list.map(mapper)))
getter('size', list => list.size)
getter('tail', list => new SovaList(list.rest()))
method('take', (list, count) => new SovaList(list.take(count)))
method('takeRight', (list, count) => new SovaList(list.takeLast(count)))
method('takeWhile', (list, condition) => new SovaList(list.takeWhile(condition)))
method('takeUntil', (list, condition) => new SovaList(list.takeUntil(condition)))
getter('toJS', list => list.toJS())

Array.prototype.toSova = function() {
  return new SovaList(this)
}

module.exports = (...elements) => new SovaList(elements)
