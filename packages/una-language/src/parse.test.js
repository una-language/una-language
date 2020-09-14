const parse = require('./parse')

const testParse = (text, expressions) => expect(parse(text)).toEqual(expressions)

test('=', () => {
    testParse('= a 1', [['=', 'a', 1]])
})
