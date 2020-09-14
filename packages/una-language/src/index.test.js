const una = require('./index')

const testUna = (text, js) => expect(una(text).trim()).toEqual(js.trim())

test('Empty', () => {
    testUna('= a 1', 'console.log("333");')
})
