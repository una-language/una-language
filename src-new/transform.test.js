const transform = require('./transform')

const testTransform = (raw, tree) => expect(transform(raw)).toEqual(tree)

test('Empty', () => {
    testTransform([], {})
})
