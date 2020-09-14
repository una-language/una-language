const transform = require('./transform')

const testTransform = (raw, tree) => expect(transform(raw)).toEqual(tree)

test('=', () => {
    testTransform(['=', 'a', 1], { type: '=', children: ['a', 1] })
})
