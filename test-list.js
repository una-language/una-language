const createImmutableList = require("./src/lib/list");

const list = createImmutableList([1, 2, 3]);

console.log(list);

console.log(list.add(4));
console.log(list.addFirst(0));
console.log(list.addLast(4));
console.log(list.forAll(element => element > 0));

console.log(list.tail);
console.log(list.size);
console.log(list.length);
