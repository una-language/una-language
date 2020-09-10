const translate = require('./translate')

const testTranslate = (tree, js) => expect(translate(tree).trim()).toEqual(js.trim())

test('=', () => {
    testTranslate({ type: '=', left: 'a', right: '1' }, 'const a = 1')
})

test('+', () => {
    testTranslate({ type: '+', params: ['1', '2'] }, '1 + 2')
    testTranslate({ type: '+', params: ['1', '2', '3'] }, '1 + 2 + 3')
})

test('-', () => {
    testTranslate({ type: '-', params: ['1'] }, '-1')
    testTranslate({ type: '-', params: ['2', '1'] }, '2 - 1')
    testTranslate({ type: '-', params: ['2', '1', '0'] }, '2 - 1 - 0')
})

test('*', () => {
    testTranslate({ type: '*', params: ['1', '2'] }, '1 * 2')
    testTranslate({ type: '*', params: ['1', '2', '3'] }, '1 * 2 * 3')
})

test('/', () => {
    testTranslate({ type: '/', params: ['1', '2'] }, '1 / 2')
    testTranslate({ type: '/', params: ['1', '2', '3'] }, '1 / 2 / 3')
})
