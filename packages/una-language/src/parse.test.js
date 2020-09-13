const parse = require('./parse')

const testParse = (text, trees) => expect(parse(text)).toEqual(trees)

test('Empty', () => {
    testParse('', [])
})
