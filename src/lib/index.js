const { List, Map } = require("immutable");

const createList = () => {
  function SovaList(input) {
    Object.defineProperty(this, "list", {
      value: List.isList(input) ? input : List(input),
      configurable: false,
      enumerable: true,
      writable: false
    });
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
  method("get", (list, index) => list.get(index));
  getter("head", list => (list.size === 0 ? undefined : list.get(0)));
  getter("length", list => list.size);
  method("map", (list, mapper) => new SovaList(list.map(mapper)));
  getter("size", list => list.size);
  getter(
    "tail",
    list => (list.size === 0 ? undefined : new SovaList(list.skip(1)))
  );
  getter("toJS", list => list.toJS());

  return (...elements) => new SovaList(elements);
};

const createMap = () => {
  function SovaMap(input) {
    Object.defineProperty(this, "object", {
      value: Map.isMap(input) ? input : Map(input),
      configurable: false,
      enumerable: false,
      writable: false
    });
    this.object.map((value, key) => {
      Object.defineProperty(this, key, {
        value,
        configurable: false,
        enumerable: true,
        writable: false
      });
    });
  }

  const getter = (name, getter) => {
    Object.defineProperty(SovaMap.prototype, name, {
      get: function() {
        return getter(this.object);
      }
    });
  };

  const method = (name, method) => {
    Object.defineProperty(SovaMap.prototype, name, {
      value: function() {
        return method(this.object, ...arguments);
      }
    });
  };

  method("map", (object, mapper) => new SovaMap(object.map(mapper)));
  getter("toJS", map => map.toJS());

  return input => new SovaMap(input);
};

global.SovaStandardLibrary = {
  list: createList(),
  map: createMap()
};
