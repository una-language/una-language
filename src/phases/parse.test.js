const setDefaultConfig = require('../config')
const parse = require('./parse')(setDefaultConfig({}))
const testParse = (text, expressions) => expect(parse(text)).toEqual(expressions)

// Assignment
test('=', () => {
  testParse('= a 1', [['=', 'a', 1]])
})

// String
test(`string`, () => {
  testParse(`'a'`, [[`'a'`]])
  testParse(`'a\\''`, [[`'a\\''`]])
  testParse(`'"a"'`, [[`'"a"'`]])
  testParse(`"a"`, [[`"a"`]])
  testParse(`"a\\""`, [[`"a\\""`]])
  testParse(`"'a'"`, [[`"'a'"`]])
  testParse(`(apply '()')`, [[['apply', "'()'"]]])
})

// String interpolation
test(`string interpolation`, () => {
  testParse("` styled.div 'color: red;'", [['`', 'styled.div', "'color: red;'"]])
})
