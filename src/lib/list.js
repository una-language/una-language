const { List } = require("immutable");

function ImmutableList(list) {
  this.list = list;
  list.forEach((element, index) => {
    Object.defineProperty(this, index, {
      value: element
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
method("forAll", (list, condition) => list.every(condition));

getter("head", list => new ImmutableList(list.take(1).get(1)));
getter("tail", list => new ImmutableList(list.skip(1)));
getter("size", list => list.size);
getter("length", list => list.size);

module.exports = array => new ImmutableList(List(array));
