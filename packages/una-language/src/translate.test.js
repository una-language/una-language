const setDefaultConfig = require('./config')
const translate = require('./translate')
const testTranslate = (tree, js, config = {}) =>
    expect(translate(setDefaultConfig(config))(tree).trim()).toEqual(js.trim())

// -- Assignment and basic operators --------------------------------------------

test('=', () => {
    testTranslate(['=', 'a', '1'], 'const a = 1')
})

test('?', () => {
    testTranslate(['?', ['>', '1', '2'], '"First"', '"Second"'], '((1 > 2) ? "First" : "Second")')
    testTranslate(
        ['?', ['&', 'a', 'b'], ['+', '1', '2'], ['*', '1', '2']],
        '((a && b) ? (1 + 2) : (1 * 2))'
    )
    testTranslate(['?', ['>', '2', '1'], ['+', '1', '2']], 'if ((2 > 1)) return (1 + 2)')
})

test('?!', () => {
    testTranslate(
        [
            '?!',
            ['=', 'func', 'null'],
            ['func', []],
            ['->', 'error', ['console.log', "'Error:'", 'error']]
        ],
        "try { const func = null; func() } catch (error) { console.log('Error:', error) }"
    )
    // TODO test try finally, try catch finally
    // Todo check await in try/catch/finally
})

// ------------------------------------------------------------------------------

// -- Symmetries ----------------------------------------------------------------

test('->', () => {
    testTranslate(['->', 'x', ['+', 'x', '1']], '(x) => (x + 1)')
    testTranslate(['->', ['x', 'y'], ['+', 'x', 'y']], '(x, y) => (x + y)')
    testTranslate(
        [
            '->',
            ['x', 'y'],
            ['=', 'a', ['*', 'x', '2']],
            ['=', 'b', ['*', 'y', '3']],
            ['+', 'a', 'b']
        ],
        '(x, y) => { const a = (x * 2); const b = (y * 3); return (a + b) }'
    )

    //TODO add tests for curried function
})

test('<-', () => {
    testTranslate(
        ['=', 'sum', ['<-', ['=', 'a', '1'], ['=', 'b', '2'], ['+', 'a', 'b']]],
        'const sum = (() => { const a = 1; const b = 2; return (a + b) })()'
    )

    // TODO add test for evaluation of no param function as Math.random
})

// TODO add tests for async function

test('<--', () => {
    testTranslate(['=', 'result', ['<--', 'promise']], 'const result = await promise')

    // TODO add test for multiple arguments work like <-
})

test('<-=', () => {
    testTranslate(['<-=', 'a'], 'export default a')
    testTranslate(['<-=', 'a'], 'module.exports = a', { modules: 'require' })

    testTranslate(['<-=', ['->', ['x'], ['+', 'x', '1']]], 'export default (x) => (x + 1)')
    testTranslate(['<-=', ['->', ['x'], ['+', 'x', '1']]], 'module.exports = (x) => (x + 1)', {
        modules: 'require'
    })

    testTranslate(['<-=', ['=', 'a', '1']], 'export const a = 1')
    testTranslate(['<-=', ['=', 'a', '1']], 'module.exports.a = 1', { modules: 'require' })
})

test('=->', () => {
    testTranslate(['=->', "'a'", 'a'], "import a from 'a'")
    testTranslate(['=->', "'a'", 'a'], "const a = require('a')", { modules: 'require' })
    // TODO add object decomposition import here
    // TODO add import 'index.css' test here
    // TODO test require here
})

// ------------------------------------------------------------------------------

// -- Arithmetical operators ----------------------------------------------------

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

test('/', () => {
    testTranslate(['/', '1', '2'], '(1 / 2)')
    testTranslate(['/', '1', '2', '3'], '(1 / 2 / 3)')
})

test('%', () => {
    testTranslate(['%', '1', '2'], '(1 % 2)')
    testTranslate(['%', '1', '2', '3'], '(1 % 2 % 3)')
})

// ------------------------------------------------------------------------------

// -- Logical operators ---------------------------------------------------------

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
})

// ------------------------------------------------------------------------------

// -- Comparison operators ------------------------------------------------------

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

test('!=', () => {
    testTranslate(['!=', '1', '2'], '(1 !== 2)')
})

// ------------------------------------------------------------------------------

// -- Collections ---------------------------------------------------------------

test('::', () => {
    testTranslate(['::', '1', '2'], '[1, 2]')
    // TODO add tests for nested arrays and maps
    // TODO add tests for getting value by index
    // add tests for array decomposition
})

test(':', () => {
    testTranslate([':', ['a', '1']], '{a: 1}')
    testTranslate([':', 'a'], '{a}')
    testTranslate([':', ['a', [':', ['b', '1']]]], '{a: {b: 1}}')

    // TODO add tests for dynamic keys like ["key"]
    // TODO add test for getting value by key
})

test('.', () => {
    testTranslate(['apply', '1', '2'], 'apply(1, 2)')
    testTranslate(['apply', []], 'apply()')
    testTranslate(['.map', 'numbers', ['->', 'x', ['+', 'x', '1']]], 'numbers.map((x) => (x + 1))')
    testTranslate(['.', 'object', 'key'], 'object[key]')
})

// ------------------------------------------------------------------------------
