const object = { a: 1, b: { c: 2, d: [3, 4, 5] }, e: `hello` }
console.log(object.a)
console.log(object.b.c)
console.log(object.b.d)
console.log(object.e)

const { a, b: { c, d }, e: renamedE } = object

console.log(a)
console.log(c)
console.log(d)
console.log(renamedE)
