const translate = require('./translate')

const testTranslate = (tree, js) => expect(translate(tree).trim()).toEqual(js.trim())

test('Assignment', () => {
    testTranslate({ type: '=', left: 'a', right: '1' }, 'const a = 1')
})
