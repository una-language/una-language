const una = require('./index')

const testUna = (text, js) => expect(una(text).trim()).toEqual(js.trim())

test('=', () => {
    testUna('= a 1', 'const a = 1')
})

test('?!', () => {
    testUna(
        `
?!
  = func null
  func ()
  -> error (console.log 'Error:' error)
  console.log 'Finally'
`,
        `
try {
    const func = null
    func()
} catch (error) {
    console.log('Error:', error)
} finally {
    console.log('Finally')
}
`
    )
})

test('.', () => {
    testUna('apply ()', 'apply()')
})

test('+', () => {
    testUna('+ 1 2', '1 + 2')
})

test('->', () => {
    testUna('= plusOne -> x (+ x 1)', 'const plusOne = x => x + 1')
    testUna('= plus -> (x y) (+ x y)', 'const plus = (x, y) => x + y')
    testUna(
        `
= func -> x 
  = a 1 
  = b 2
  + a b x`,
        `
const func = x => {
    const a = 1
    const b = 2
    return a + b + x
}`
    )
})

//TODO check object?.value?.subvalue (elvis) works
