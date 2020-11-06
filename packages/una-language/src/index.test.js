const una = require('./index')
const testUna = (text, js) => expect(una(text).trim()).toEqual(js.trim())

// Assignment
test('=', () => {
    testUna('= a 1', 'const a = 1')
})

// Application
test('apply', () => {
    testUna('= number Math.random ()', 'const number = Math.random()')
})

// Sync symmetry
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

// Error symmetry
test('|->', () => {
    testUna(
        `
= value |->
  -> error 2
  = func null
  func ()
`,
        `
const value = (() => {
    try {
        const func = null
        return func()
    } catch (error) {
        return 2
    }
})() 
`
    )
})
test('<-|', () => {
    testUna(
        `
<-| 'Failed'
`,
        `
throw new Error('Failed')
`
    )
})

// Chaining symmetry
test('|>', () => {
    testUna(
        `
= numbers |> (:: 1 2 3)
  _.map (-> x (+ x 1))
    `,
        `
const numbers = _.map(x => x + 1, [1, 2, 3])
`
    )
})
test('<|', () => {
    testUna(
        `
= numbers <| (:: 1 2 3)
  .map (-> x (+ x 1))
  .filter (-> x (> x 2))
  .reduce (-> (x y) (+ x y)) 0
    `,
        `
const numbers = [1, 2, 3]
    .map(x => x + 1)
    .filter(x => x > 2)
    .reduce((x, y) => x + y, 0)
`
    )
})

// Arithmetics
test('+', () => {
    testUna('+ 1 2', '1 + 2')
})

// React
test('react', () => {
    testUna(
        `
=-> 'index.css'
=-> 'react' React
=-> 'react-dom' ReactDOM
=-> './styles' styles

= (: (createElement e)) React

= App -> ((: name))
    e 'div' (: (style styles.container))
    e 'div' (: (style styles.hello)) 'Hello'
    e 'div' (: (style styles.name)) name
ReactDOM.render (e App (: (name 'John'))) (document.getElementById 'root')
`,
        `
import 'index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles'
const { createElement: e } = React
const App = ({ name }) => {
    e('div', { style: styles.container })
    e('div', { style: styles.hello }, 'Hello')
    return e('div', { style: styles.name }, name)
}
ReactDOM.render(e(App, { name: 'John' }), document.getElementById('root'))
`
    ),
        testUna(`=-> 'react' React (: (useState))`, `import React, { useState } from 'react'`)
})
test('styled-components', () => {
    testUna(
        `
\`
  styled.div
  'color: red;'
  'font-size: 30;'
`,
        `
styled.div\`
    color: red;
    font-size: 30;
\`
`
    )
})

// Collections
test('.', () => {
    testUna('apply ()', 'apply()')
    testUna('= object (: (. key value))', 'const object = { [key]: value }')
})

test('...', () => {
    testUna(
        `
= func -> ...props
  console.log props
func 1 2
`,
        `
const func = (...props) => console.log(props)
func(1, 2)
`
    )
})

// Semicolon
test(';', () => {
    testUna(
        `
console.log
  ? (> 2 1) "Greater" "Less"
  
? (> 2 1)
  console.log "A"
  console.log "B"
`,
        `console.log(2 > 1 ? 'Greater' : 'Less')
2 > 1 ? console.log('A') : console.log('B')`
    )
})
