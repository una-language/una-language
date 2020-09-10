const una = require('../src-new')

const testUna = (unaCode, jsCode) => expect(una(unaCode).trim()).toEqual(jsCode.trim())

test('Assignment', () => {
    testUna('', 'result')
})
