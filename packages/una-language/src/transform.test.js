const transform = require('./transform')
const testTransform = (raw, tree) => expect(transform(raw)).toEqual(tree)

test('=', () => {
    testTransform(['=', 'a', '1'], ['=', 'a', '1'])
    testTransform(['=', 'a', ['+', '1', '2']], ['=', 'a', ['+', '1', '2']])
    testTransform(['=', 'a', '+', '1', '2'], ['=', 'a', ['+', '1', '2']])
})

test('+', () => {
    testTransform(['+', '1', '2'], ['+', '1', '2'])
})

test('<--', () => {
    testTransform(['=', 'a', ['<--', ['promise']]], ['=', 'a', ['<--', 'promise']])
    testTransform(['=', 'a', ['<--', 'promise']], ['=', 'a', ['<--', 'promise']])
    testTransform(['=', 'a', '<--', 'promise'], ['=', 'a', ['<--', 'promise']])
})

test('<-=', () => {
    testTransform(['<-=', 'a'], ['<-=', 'a'])
    testTransform(['<-=', ['+', '1', '2']], ['<-=', ['+', '1', '2']])
    testTransform(['<-=', '+', '1', '2'], ['<-=', ['+', '1', '2']])
})

test('|>', () => {
    testTransform(['|>', 'number', 'double'], ['double', 'number'])
    testTransform(
        ['|>', ['::', '1', '2', '3'], ['.map', ['->', 'x', ['+', 'x', '1']]]],
        ['.map', ['::', '1', '2', '3'], ['->', 'x', ['+', 'x', '1']]]
    )
})
