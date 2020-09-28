const translate = require('./translate')
const testTranslate = (tree, js) => expect(translate(tree).trim()).toEqual(js.trim())

// -- Assignment and application ------------------------------------------------

test('=', () => {
    testTranslate({ type: '=', children: ['a', '1'] }, 'const a = 1')
})

test('apply', () => {
    testTranslate({ type: 'apply', children: ['1', '2'] }, 'apply(1, 2)')
})

// ------------------------------------------------------------------------------

// -- Symmetries ----------------------------------------------------------------

test('->', () => {
    testTranslate(
        { type: '->', children: [{ type: '+', children: ['x', 'y'] }], params: ['x', 'y'] },
        '(x, y) => (x + y)'
    )
    testTranslate(
        {
            type: '->',
            params: ['x', 'y'],
            children: [
                { type: '=', children: ['a', { type: '*', children: ['x', '2'] }] },
                { type: '=', children: ['b', { type: '*', children: ['y', '3'] }] },
                { type: '+', children: ['a', 'b'] }
            ]
        },
        '(x, y) => { const a = (x * 2); const b = (y * 3); return (a + b); }'
    )

    //TODO add tests for curried function
})

test('<-', () => {
    testTranslate(
        {
            type: '=',
            children: [
                'sum',
                {
                    type: '<-',
                    children: [
                        { type: '=', children: ['a', '1'] },
                        { type: '=', children: ['b', '2'] },
                        { type: '+', children: ['a', 'b'] }
                    ]
                }
            ]
        },
        'const sum = (() => { const a = 1; const b = 2; return (a + b); })()'
    )

    // TODO add test for evaluation of no param function as Math.random
})

// TODO add tests for async function

test('<--', () => {
    testTranslate(
        {
            type: '=',
            children: [
                'result',
                {
                    type: '<--',
                    children: ['promise']
                }
            ]
        },
        'const result = await promise'
    )

    // TODO add test for multiple arguments work like Promise.all
})

test('=->', () => {
    testTranslate({ type: '=->', children: ['a'] }, 'module.exports = a')
    testTranslate(
        {
            type: '=->',
            children: [
                { type: '->', params: ['x'], children: [{ type: '+', children: ['x', '1'] }] }
            ]
        },
        'module.exports = (x) => (x + 1)'
    )
})

test('<-=', () => {
    testTranslate(
        {
            type: '<-=',
            children: ["'A'", 'a']
        },
        "const a = require('A')"
    )
    // TODO add object decomposition import here
})

// ------------------------------------------------------------------------------

// -- Arithmetical operators ----------------------------------------------------

test('+', () => {
    testTranslate({ type: '+', children: ['1', '2'] }, '(1 + 2)')
    testTranslate({ type: '+', children: ['1', '2', '3'] }, '(1 + 2 + 3)')
    testTranslate(
        { type: '+', children: ['1', { type: '+', children: ['2', '3'] }] },
        '(1 + (2 + 3))'
    )
})

test('-', () => {
    testTranslate({ type: '-', children: ['1'] }, '-1')
    testTranslate({ type: '-', children: ['2', '1'] }, '(2 - 1)')
    testTranslate({ type: '-', children: ['2', '1', '0'] }, '(2 - 1 - 0)')
})

test('*', () => {
    testTranslate({ type: '*', children: ['1', '2'] }, '(1 * 2)')
    testTranslate({ type: '*', children: ['1', '2', '3'] }, '(1 * 2 * 3)')
})

test('/', () => {
    testTranslate({ type: '/', children: ['1', '2'] }, '(1 / 2)')
    testTranslate({ type: '/', children: ['1', '2', '3'] }, '(1 / 2 / 3)')
})

test('%', () => {
    testTranslate({ type: '%', children: ['1', '2'] }, '(1 % 2)')
    testTranslate({ type: '%', children: ['1', '2', '3'] }, '(1 % 2 % 3)')
})

// ------------------------------------------------------------------------------

// -- Logical operators ---------------------------------------------------------

test('&', () => {
    testTranslate({ type: '&', children: ['true', 'false'] }, '(true && false)')
    testTranslate(
        { type: '&', children: ['true', 'false', 'booleanVariable'] },
        '(true && false && booleanVariable)'
    )
})

test('|', () => {
    testTranslate({ type: '|', children: ['true', 'false'] }, '(true || false)')
    testTranslate(
        { type: '|', children: ['true', 'false', 'booleanVariable'] },
        '(true || false || booleanVariable)'
    )
})

test('!', () => {
    testTranslate({ type: '!', children: ['true'] }, '!true')
    testTranslate({ type: '!', children: ['booleanVariable'] }, '!booleanVariable')
})

// ------------------------------------------------------------------------------

// -- Comparison operators ------------------------------------------------------

test('>', () => {
    testTranslate({ type: '>', children: ['1', '2'] }, '(1 > 2)')
})

test('>=', () => {
    testTranslate({ type: '>=', children: ['1', '2'] }, '(1 >= 2)')
})

test('<', () => {
    testTranslate({ type: '<', children: ['1', '2'] }, '(1 < 2)')
})

test('<=', () => {
    testTranslate({ type: '<=', children: ['1', '2'] }, '(1 <= 2)')
})

test('==', () => {
    testTranslate({ type: '==', children: ['1', '2'] }, '(1 === 2)')
})

test('!=', () => {
    testTranslate({ type: '!=', children: ['1', '2'] }, '(1 !== 2)')
})

// ------------------------------------------------------------------------------

// -- Conditional operator ------------------------------------------------------

test('?', () => {
    testTranslate(
        {
            type: '?',
            children: [{ type: '>', children: ['1', '2'] }, '"First"', '"Second"']
        },
        '((1 > 2) ? "First" : "Second")'
    )
    testTranslate(
        {
            type: '?',
            children: [
                { type: '&', children: ['a', 'b'] },
                { type: '+', children: ['1', '2'] },
                { type: '*', children: ['1', '2'] }
            ]
        },
        '((a && b) ? (1 + 2) : (1 * 2))'
    )
    testTranslate(
        {
            type: '?',
            children: [
                { type: '>', children: ['2', '1'] },
                { type: '+', children: ['1', '2'] }
            ]
        },
        'if ((2 > 1)) return (1 + 2)'
    )
})

// ------------------------------------------------------------------------------

// -- Collections ---------------------------------------------------------------

test('::', () => {
    testTranslate({ type: '::', children: ['1', '2'] }, '[1, 2]')
    // TODO add tests for nested arrays and maps
    // TODO add tests for getting value by index
    // add tests for array decomposition
})

test(':', () => {
    testTranslate({ type: ':', children: [{ type: 'a', children: ['1'] }] }, '{a: 1}')
    testTranslate({ type: ':', children: [{ type: 'a', children: [] }] }, '{a}')
    testTranslate(
        {
            type: ':',
            children: [
                { type: 'a', children: [{ type: ':', children: [{ type: 'b', children: ['1'] }] }] }
            ]
        },
        '{a: {b: 1}}'
    )
    testTranslate(
        {
            type: ':',
            children: [{ type: 'a', children: [] }]
        },
        '{a}'
    )

    // TODO add tests for dynamic keys like ["key"]
    // TODO add test for getting value by key
})

// ------------------------------------------------------------------------------
