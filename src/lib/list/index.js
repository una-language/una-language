var List = require("immutable").List;

function SovaList(input) {
  this.list = Array.isArray(input) ? List(input) : input;
  this.list.forEach((element, index) => {
    Object.defineProperty(this, index, {
      value: element,
      configurable: false,
      enumerable: false,
      writable: false
    });
  });
}

const getter = (name, getter) => {
  Object.defineProperty(SovaList.prototype, name, {
    get: function() {
      return getter(this.list);
    }
  });
};

const method = (name, method) => {
  Object.defineProperty(SovaList.prototype, name, {
    value: function() {
      return method(this.list, ...arguments);
    }
  });
};

method("add", (list, element) => new SovaList(list.push(element)));
method("addFirst", (list, element) => new SovaList(list.unshift(element)));
method("addLast", (list, element) => new SovaList(list.push(element)));
method("exists", (list, condition) => list.some(condition));
method("filter", (list, condition) => new SovaList(list.filter(condition)));
method("forAll", (list, condition) => list.every(condition));
getter("head", list => (list.size === 0 ? undefined : list.get(0)));
getter("length", list => list.size);
method("map", (list, mapper) => new SovaList(list.map(mapper)));
getter("size", list => list.size);
getter(
  "tail",
  list => (list.size === 0 ? undefined : new SovaList(list.skip(1)))
);
getter("toJS", list => list.toJS());

module.exports = (...elements) => new SovaList(elements);
