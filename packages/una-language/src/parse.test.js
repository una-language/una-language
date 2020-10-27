const parse = require('./parse')
const testParse = (text, expressions) => expect(parse(text)).toEqual(expressions)

test('=', () => {
    testParse('= a 1', [['=', 'a', 1]])
})

test(`string`, () => {
    testParse(`'a'`, [[`'a'`]])
    testParse(`'a\\''`, [[`'a\\''`]])
    testParse(`'"a"'`, [[`'"a"'`]])

    testParse(`"a"`, [[`"a"`]])
    testParse(`"a\\""`, [[`"a\\""`]])
    testParse(`"'a'"`, [[`"'a'"`]])

    testParse(`(apply '()')`, [[['apply', "'()'"]]])
})
