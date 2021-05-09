const setDefaultConfig = require('../config')
const transform = require('./transform')
const testTransform = (raw, tree, config = {}) => expect(transform(setDefaultConfig(config))([raw])).toEqual([tree])

// Assignment
test('=', () => {
  testTransform(['=', 'a', '1'], ['=', 'a', '1'])
  testTransform(['=', 'a', ['+', '1', '2']], ['=', 'a', ['+', '1', '2']])
  testTransform(['=', 'a', '+', '1', '2'], ['=', 'a', ['+', '1', '2']])
})

// Right sync symmetry
test('->', () => {
  testTransform(['->', 'x', ['+', 'x', '1']], ['->', ['x'], ['+', 'x', '1']]),
    testTransform(['->', ['x', 'y'], ['+', 'x', 'y']], ['->', ['x', 'y'], ['+', 'x', 'y']])
})

// Right async symmetry
test('-->', () => {
  testTransform(['-->', 'x', ['+', 'x', '1']], ['-->', ['x'], ['+', 'x', '1']]),
    testTransform(['-->', ['x', 'y'], ['+', 'x', 'y']], ['-->', ['x', 'y'], ['+', 'x', 'y']])
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
    ['_.map', ['->', ['x'], ['+', 'x', '1']], ['::', '1', '2', '3']]
  )
})
test('<|', () => {
  testTransform(['<|', 'number', 'double'], ['double', 'number'])
  testTransform(
    ['<|', ['::', '1', '2', '3'], ['.map', ['->', 'x', ['+', 'x', '1']]]],
    ['.map', ['::', '1', '2', '3'], ['->', ['x'], ['+', 'x', '1']]]
  )
})

test('Custom transform rules', () => {
  testTransform(['+++', '1', '2'], ['+++', '2', '1'], {
    customTransformRules: {
      '+++': (transform, operator, operands) => [operator, transform(operands[1]), transform(operands[0])]
    }
  })
})
