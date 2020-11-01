const _ = require('lodash')
const parser = require('parsimmon')

const convertTabs = lines => {
    if (lines.length === 0) return ''
    const [head, ...tail] = lines
    const sublines = _.takeWhile(tail, line => line.level > head.level)
    const currentExpression = `( ${head.value} ${convertTabs(sublines)})`
    const nextExpressions = convertTabs(_.drop(tail, sublines.length))
    return (
        currentExpression +
        (head.level === 0 && nextExpressions.length > 0 ? '\n' : '') +
        nextExpressions
    )
}

const language = parser.createLanguage({
    expression: rules =>
        parser.alt(
            rules.stringSingleQuote,
            rules.stringDoubleQuote,
            rules.number,
            rules.symbol,
            rules.list
        ),
    symbol: () =>
        parser.regexp(/[a-zA-Z_|=:+*/`.?<>&!-][=a-zA-Z0-9_=|:+*/`.?<&>!-]*/).desc('symbol'),
    stringSingleQuote: () =>
        parser
            .regexp(/'((?:\\.|.)*?)'/, 1)
            .map(string => `'${string}'`)
            .desc('string'),
    stringDoubleQuote: () =>
        parser
            .regexp(/"((?:\\.|.)*?)"/, 1)
            .map(string => `"${string}"`)
            .desc('string'),
    number: () =>
        parser
            .regexp(/-?(0|[1-9][0-9]*)([.][0-9]+)?([eE][+-]?[0-9]+)?/)
            .map(Number)
            .desc('number'),
    list: rules =>
        rules.expression
            .trim(parser.optWhitespace)
            .many()
            .wrap(parser.string('('), parser.string(')')),
    file: rules => rules.expression.trim(parser.optWhitespace).many()
})

module.exports = text => {
    if (!text.trim()) return []

    const lines = text.split('\n').filter(line => line.trim())
    const indentedLines = lines.map(line => ({ level: line.search(/\S/) / 2, value: line.trim() }))
    const code = convertTabs(indentedLines)
    return language.file.tryParse(code)
}
