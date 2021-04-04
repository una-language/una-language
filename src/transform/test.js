const transform = require('.')
const testTransform = (raw, tree) => expect(transform(raw)).toEqual(tree)

// Assignment
test('=', () => {
    testTransform(['=', 'a', '1'], ['=', 'a', '1'])
    testTransform(['=', 'a', ['+', '1', '2']], ['=', 'a', ['+', '1', '2']])
    testTransform(['=', 'a', '+', '1', '2'], ['=', 'a', ['+', '1', '2']])
})

// Left module symmetry
test('<-=', () => {
    testTransform(['<-=', 'a'], ['<-=', 'a'])
    testTransform(['<-=', ['+', '1', '2']], ['<-=', ['+', '1', '2']])
    testTransform(['<-=', '+', '1', '2'], ['<-=', ['+', '1', '2']])
})

// Chaining symmetry
test('|>', () => {
    testTransform(['|>', 'number', 'double'], ['double', 'number'])
    testTransform(
        ['|>', ['::', '1', '2', '3'], ['_.map', ['->', 'x', ['+', 'x', '1']]]],
        ['_.map', ['->', 'x', ['+', 'x', '1']], ['::', '1', '2', '3']]
    )
})
test('<|', () => {
    testTransform(['<|', 'number', 'double'], ['double', 'number'])
    testTransform(
        ['<|', ['::', '1', '2', '3'], ['.map', ['->', 'x', ['+', 'x', '1']]]],
        ['.map', ['::', '1', '2', '3'], ['->', 'x', ['+', 'x', '1']]]
    )
})
