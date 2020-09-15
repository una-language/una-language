const transform = require('./transform')

const testTransform = (raw, tree) => expect(transform(raw)).toEqual(tree)

test('=', () => {
    testTransform(['=', 'a', 1], { type: '=', children: ['a', 1] })
    testTransform(['=', 'a', ['+', 1, 2]], {
        type: '=',
        children: ['a', { type: '+', children: [1, 2] }]
    })
    testTransform(['=', 'a', '+', 1, 2], {
        type: '=',
        children: ['a', { type: '+', children: [1, 2] }]
    })
})

test('+', () => {
    testTransform(['+', 1, 2], { type: '+', children: [1, 2] })
})

test('<--', () => {
    testTransform(['=', 'a', ['<--', ['promise']]], {
        type: '=',
        children: ['a', { type: '<--', children: ['promise'] }]
    })
    testTransform(['=', 'a', ['<--', 'promise']], {
        type: '=',
        children: ['a', { type: '<--', children: ['promise'] }]
    })
    testTransform(['=', 'a', '<--', 'promise'], {
        type: '=',
        children: ['a', { type: '<--', children: ['promise'] }]
    })
})
