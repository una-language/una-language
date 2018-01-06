const { List } = require("immutable");

function ImmutableList(list) {
  this.list = list;
  list.forEach((element, index) => {
    Object.defineProperty(this, index, {
      value: element,
      configurable: false,
      enumerable: false,
      writable: false
    });
  });
}

const getter = (name, getter) => {
  Object.defineProperty(ImmutableList.prototype, name, {
    get: function() {
      return getter(this.list);
    }
  });
};

const method = (name, method) => {
  Object.defineProperty(ImmutableList.prototype, name, {
    value: function() {
      return method(this.list, ...arguments);
    }
  });
};

method("add", (list, element) => new ImmutableList(list.push(element)));
method("addFirst", (list, element) => new ImmutableList(list.unshift(element)));
method("addLast", (list, element) => new ImmutableList(list.push(element)));
method("exists", (list, condition) => list.some(condition));
method("forAll", (list, condition) => list.every(condition));
getter("head", list => (list.size === 0 ? undefined : list.get(0)));
getter("length", list => list.size);
getter("size", list => list.size);
getter(
  "tail",
  list => (list.size === 0 ? undefined : new ImmutableList(list.skip(1)))
);

module.exports = array => new ImmutableList(List(array));
