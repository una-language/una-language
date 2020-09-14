const una = require('./index')

const testUna = (text, js) => expect(una(text).trim()).toEqual(js.trim())

test('=', () => {
    testUna('= a 1', 'const a = 1')
})
