const object = Sova.map({
  a: 1,
  b: Sova.map({ c: 2, d: Sova.list(3, 4, 5) }),
  e: `hello`
})
console.log(object)
console.log(object.a)
console.log(object.b)
console.log(object.b.c)
console.log(object.b.d)
console.log(object.e)

const { a, b: { c, d }, e } = object

console.log(a)
console.log(c)
console.log(d)
console.log(e)
