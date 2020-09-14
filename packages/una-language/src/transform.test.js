const transform = require('./transform')

const testTransform = (raw, tree) => expect(transform(raw)).toEqual(tree)

test('=', () => {
    testTransform(['=', 'a', 1], { type: '=', children: ['a', 1] })
})

test('+', () => {
    testTransform(['+', 1, 2], { type: '+', children: [1, 2] })
})

// TODO add test on apply
// getFunction(1)("abc")
