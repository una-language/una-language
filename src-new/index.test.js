const una = require('./index')

const testUna = (text, js) => expect(una(text).trim()).toEqual(js.trim())

test('Assignment', () => {
    testUna('', '')
})
