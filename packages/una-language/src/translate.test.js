const translate = require('./translate')
const testTranslate = (tree, js) => expect(translate(tree).trim()).toEqual(js.trim())

test('=', () => {
    testTranslate({ type: '=', children: ['a', '1'] }, 'const a = 1')
})

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
})

// test('<-', () => {
//     testTranslate(
//         { type: '<-' },
//         'const sum = (function() {const a = 1; const b = 2; return a + b; })()'
//     )
// })
