const transform = require('./transform')

const testTransform = (tree, js) => expect(transform(tree).trim()).toEqual(js.trim())

test('Assignment', () => {
    testTransform({}, 'result')
})
