const setDefaultConfig = require('../config')
const translate = require('./translate')
const testTranslate = (tree, js, config = {}) =>
  expect(translate(setDefaultConfig(config))([tree])[0].trim()).toEqual(js.trim())

// Assignment
test('=', () => {
  testTranslate(['=', 'a', '1'], 'const a = 1')
})

// Application
test('apply', () => {
  testTranslate(['apply', '1', '2'], 'apply(1, 2)')
  testTranslate(['apply', []], 'apply()')
  testTranslate(['=', 'number', ['Math.random', []]], 'const number = Math.random()')
  testTranslate(
    [['connect', 'mapStateToProps', 'mapMethodsToProps'], 'Component'],
    'connect(mapStateToProps, mapMethodsToProps)(Component)'
  )
})

// Conditions
test('?', () => {
  testTranslate(['?', ['>', '1', '2'], '"First"', '"Second"'], '((1 > 2) ? "First" : "Second")')
  testTranslate(['?', ['&', 'a', 'b'], ['+', '1', '2'], ['*', '1', '2']], '((a && b) ? (1 + 2) : (1 * 2))')
  testTranslate(['?', ['>', '1', '2'], '"First"'], '((1 > 2) ? "First" : undefined)')
  testTranslate(
    ['?', ['>', '1', '2'], ['<-', ['console.log', '"Hello"']]],
    '((1 > 2) ? (() => (console.log("Hello")))() : undefined)'
  )
})
test('?!', () => {
  testTranslate(['?!', ['>', '2', '1'], ['+', '1', '2']], 'if ((2 > 1)) return (1 + 2)')
  testTranslate(
    ['?!', ['>', '2', '1'], ['=', 'a', '1'], ['=', 'b', '2'], ['+', 'a', 'b']],
    'if ((2 > 1)) { const a = 1; const b = 2; return (a + b) }'
  )
})

test('??', () => {
  testTranslate(['??', 'null', '2'], '(null ?? 2)')
  testTranslate(['??', 'null', 'false', '32'], '(null ?? false ?? 32)')
})

// Sync symmetry
test('->', () => {
  testTranslate(['->', ['x'], ['+', 'x', '1']], '(x) => ((x + 1))')
  testTranslate(['->', ['x', 'y'], ['+', 'x', 'y']], '(x, y) => ((x + y))')
  testTranslate(
    ['->', ['x', 'y'], ['=', 'a', ['*', 'x', '2']], ['=', 'b', ['*', 'y', '3']], ['+', 'a', 'b']],
    '(x, y) => { const a = (x * 2); const b = (y * 3); return (a + b) }'
  )
  testTranslate(['->', ['a'], ['->', ['b'], ['+', 'a', 'b']]], '(a) => ((b) => ((a + b)))')
})
test('<-', () => {
  testTranslate(
    ['=', 'sum', ['<-', ['=', 'a', '1'], ['=', 'b', '2'], ['+', 'a', 'b']]],
    'const sum = (() => { const a = 1; const b = 2; return (a + b) })()'
  )
})

// Async symmetry
test('-->', () => {
  testTranslate(['-->', ['x'], ['+', 'x', '1']], 'async (x) => ((x + 1))')
})
test('<--', () => {
  testTranslate(['=', 'result', ['<--', 'promise']], 'const result = await promise')
  testTranslate(
    [['=', 'result', ['<--', ['=', 'a', ['<--', 'promise']], ['a']]]],
    'const result = await (async () => { const a = await promise; return a })()'
  )

  testTranslate(
    ['<--', ['=', 'a', ['<--', ['getAsync', '1']]], ['+', 'a', '1']],
    'await (async () => { const a = await getAsync(1); return (a + 1) })()'
  )
})

// Module symmetry
test('=->', () => {
  testTranslate(['=->', "'a'"], "import 'a'")
  testTranslate(['=->', "'a'"], "require('a')", { modules: 'require' })
  testTranslate(['=->', "'a'", 'a'], "import a from 'a'")
  testTranslate(['=->', "'a'", 'a'], "const a = require('a')", { modules: 'require' })
  testTranslate(['=->', "'a'", [':', 'a']], "import {a} from 'a'")
  testTranslate(['=->', "'a'", [':', 'a']], "const {a} = require('a')", { modules: 'require' })
  testTranslate(['=->', "'react'", 'React', [':', 'useState']], "import React, {useState} from 'react'")
})
test('<-=', () => {
  testTranslate(['<-=', 'a'], 'export default a')
  testTranslate(['<-=', 'a'], 'module.exports = a', { modules: 'require' })
  testTranslate(['<-=', ['->', ['x'], ['+', 'x', '1']]], 'export default (x) => ((x + 1))')
  testTranslate(['<-=', ['->', ['x'], ['+', 'x', '1']]], 'module.exports = (x) => ((x + 1))', {
    modules: 'require'
  })
  testTranslate(['<-=', ['=', 'a', '1']], 'export const a = 1')
  testTranslate(['<-=', ['=', 'a', '1']], 'module.exports.a = 1', { modules: 'require' })

  testTranslate(['<-=', [[], 'a', 'b']], 'export { a, b }')
  testTranslate(['<-=', [[], 'a', 'b']], 'module.exports = { a, b }', { modules: 'require' })
})

// Error symmetry
test('|->', () => {
  testTranslate(
    ['|->', ['<-', ['=', 'func', 'null'], ['func', []]], ['->', ['error'], ['console.log', 'error'], '"A"']],
    '(() => { try { const func = null; return func() } catch (error) { console.log(error); return "A" } })()'
  )
  testTranslate(
    ['|->', ['<--', ['func', []]], ['->', ['error'], ['console.log', 'error'], '"A"']],
    'await (async () => { try { return func() } catch (error) { console.log(error); return "A" } })()'
  )
  testTranslate(
    ['|->', ['<-', ['func', []]], ['-->', ['error'], ['console.log', 'error'], ['someAsyncFunc', []]]],
    'await (async () => { try { return func() } catch (error) { console.log(error); return someAsyncFunc() } })()'
  )
})
test('<-|', () => {
  testTranslate(['<-|', '"Failed"'], '(() => { throw new Error("Failed") })()')
})

// Arithmetics
test('+', () => {
  testTranslate(['+', '1', '2'], '(1 + 2)')
  testTranslate(['+', '1', '2', '3'], '(1 + 2 + 3)')
  testTranslate(['+', '1', ['+', '2', '3']], '(1 + (2 + 3))')
})
test('-', () => {
  testTranslate(['-', '1'], '-1')
  testTranslate(['-', '2', '1'], '(2 - 1)')
  testTranslate(['-', '2', '1', '0'], '(2 - 1 - 0)')
})
test('*', () => {
  testTranslate(['*', '1', '2'], '(1 * 2)')
  testTranslate(['*', '1', '2', '3'], '(1 * 2 * 3)')
})
test('**', () => {
  testTranslate(['**', '1', '2'], '(1 ** 2)')
  testTranslate(['**', '1', '2', '3'], '(1 ** 2 ** 3)')
})
test('/', () => {
  testTranslate(['/', '1', '2'], '(1 / 2)')
  testTranslate(['/', '1', '2', '3'], '(1 / 2 / 3)')
})
test('%', () => {
  testTranslate(['%', '1', '2'], '(1 % 2)')
  testTranslate(['%', '1', '2', '3'], '(1 % 2 % 3)')
})

// Logic
test('&', () => {
  testTranslate(['&', 'true', 'false'], '(true && false)')
  testTranslate(['&', 'true', 'false', 'booleanVariable'], '(true && false && booleanVariable)')
})
test('|', () => {
  testTranslate(['|', 'true', 'false'], '(true || false)')
  testTranslate(['|', 'true', 'false', 'booleanVariable'], '(true || false || booleanVariable)')
})
test('!', () => {
  testTranslate(['!', 'true'], '!true')
  testTranslate(['!', 'booleanVariable'], '!booleanVariable')
  testTranslate(['!', ['>', 'x', '1']], '!(x > 1)')
})

// Comparison
test('>', () => {
  testTranslate(['>', '1', '2'], '(1 > 2)')
})
test('>=', () => {
  testTranslate(['>=', '1', '2'], '(1 >= 2)')
})
test('<', () => {
  testTranslate(['<', '1', '2'], '(1 < 2)')
})
test('<=', () => {
  testTranslate(['<=', '1', '2'], '(1 <= 2)')
})
test('==', () => {
  testTranslate(['==', '1', '2'], '(1 === 2)')
})
test('~=', () => {
  testTranslate(['~=', '1', '2'], '(1 == 2)')
})
test('!=', () => {
  testTranslate(['!=', '1', '2'], '(1 !== 2)')
})
test('!~=', () => {
  testTranslate(['!~=', '1', '2'], '(1 != 2)')
})

test('_&', () => {
  testTranslate(['_&', '0', '1'], '(0 & 1)')
  testTranslate(['_&', '0', '1', '0'], '(0 & 1 & 0)')
})

test('_|', () => {
  testTranslate(['_|', '0', '1'], '(0 | 1)')
  testTranslate(['_|', '0', '1', '0'], '(0 | 1 | 0)')
})

test('_!', () => {
  testTranslate(['_!', '0', '1'], '~0')
})

test('_^', () => {
  testTranslate(['_^', '0', '1'], '(0 ^ 1)')
  testTranslate(['_^', '0', '1', '0'], '(0 ^ 1 ^ 0)')
})

test('_>>', () => {
  testTranslate(['_>>', '0', '1'], '(0 >> 1)')
  testTranslate(['_>>', '0', '1', '0'], '(0 >> 1 >> 0)')
})

test('_>>>', () => {
  testTranslate(['_>>>', '0', '1'], '(0 >>> 1)')
  testTranslate(['_>>>', '0', '1', '0'], '(0 >>> 1 >>> 0)')
})

test('_>>', () => {
  testTranslate(['_<<', '0', '1'], '(0 << 1)')
  testTranslate(['_<<', '0', '1', '0'], '(0 << 1 << 0)')
})

// Collections
test('::', () => {
  testTranslate(['::', '1', '2'], '[1, 2]')
  testTranslate(['=', ['::', 'a', 'b'], 'array'], 'const [a, b] = array')
  testTranslate(['::', [':', ['a', '1'], ['b', '2']], ['::', '1', '2']], '[{a: 1, b: 2}, [1, 2]]')
  testTranslate(['::'], '[]')
})
test(':', () => {
  testTranslate([':', ['a', '1']], '{a: 1}')
  testTranslate([':', 'a'], '{a}')
  testTranslate([':', ['a', [':', ['b', '1']]]], '{a: {b: 1}}')
  testTranslate([':', ['a', [':', ['b', '1']]], ['c', '2'], ['d', ['::', '3', '4']]], '{a: {b: 1}, c: 2, d: [3, 4]}')
  testTranslate([':'], '{}')
})
test('.', () => {
  testTranslate(['.map', 'numbers', ['->', ['x'], ['+', 'x', '1']]], 'numbers.map((x) => ((x + 1)))')
  testTranslate(['.', 'object', 'key'], 'object[key]')
  testTranslate(['.', 'array', '0'], 'array[0]')
  testTranslate([':', ['.', 'key', 'value']], '{[key]: value}')
  testTranslate(['.key', 'object'], 'object.key')
})
test('?.', () => {
  testTranslate(['?.', 'a', 'b'], 'a?.[b]')
  testTranslate(['?.', 'a', "'b'"], "a?.['b']")
  testTranslate(['a?.b?.c'], 'a?.b?.c')
  testTranslate(['?.b', 'a', 'c'], 'a?.b(c)')
  testTranslate(['?.b', 'a'], 'a?.b')
})
test('...', () => {
  testTranslate(['...object'], '...object')
  testTranslate(['...', 'object'], '...object')
  testTranslate(['...', [':', ['a', '1']]], '...{a: 1}')
  testTranslate([':', ['...', 'a']], '{...a}')
})

// String interpolation
test('`', () => {
  testTranslate(['`', "'Number'"], '`Number`')
  testTranslate(['`', ["'Number: ${0}'", 'number']], '`Number: ${number}`')
  testTranslate(['`', ["'A: ${0} - ${1}'", 'a', 'b']], '`A: ${a} - ${b}`')
  testTranslate(['`', ["'B: ${0}'", ['+', '1', '2']]], '`B: ${(1 + 2)}`')
  testTranslate(['`', ["'C: ${0}'", ['->', ['x'], ['+', 'x', '1']]]], '`C: ${(x) => ((x + 1))}`')
  testTranslate(['`', ["'D: ${0}'", 'd'], ["'E: ${0}'", 'e']], '`D: ${d}\nE: ${e}`')
  testTranslate(['`', ["'F: \\${0} ${0}'", 'f']], '`F: \\${0} ${f}`')
  testTranslate(['`', 'styled.div', ["'Number: ${0}'", 'number']], 'styled.div`Number: ${number}`')
  testTranslate(['`', ["'hello ${0}'", ['`', ["'my friend, ${0}'", "'John'"]]]], "`hello ${`my friend, ${'John'}`}`")
})

test('new', () => {
  testTranslate(['new', 'Date'], '(new Date())')
  testTranslate(['new', 'Date', []], '(new Date())')
  testTranslate(['new', 'Cat', ['1']], '(new Cat(1))')
  testTranslate(['new', 'Promise', ['->', ['resolve'], ['resolve', '3']]], '(new Promise((resolve) => (resolve(3))))')
})

test('typeof', () => {
  testTranslate(['typeof', 'true'], 'typeof true')
  testTranslate(['typeof', ['+', '1', '2']], 'typeof (1 + 2)')
  testTranslate(['typeof', ["'Hello'"]], "typeof 'Hello'")
})

test('typeof', () => {
  testTranslate(['instanceof', 'func', 'Function'], 'func instanceof Function')
})

test('Custom translate rules', () => {
  testTranslate(['+++', 'a', 'b'], '(a + b)', {
    customTranslateRules: {
      '+++': (translate, value, children) => `(${translate(children[0])} + ${translate(children[1])})`
    }
  })
})
