const parser = require('parsimmon')

module.exports = parser.createLanguage({
    expression: rules =>
        parser.alt(
            rules.stringSingleQuote,
            rules.stringDoubleQuote,
            rules.number,
            rules.symbol,
            rules.list
        ),
    symbol: () =>
        parser.regexp(/[a-zA-Z_|=:+*/`.?<>%&~!-][=a-zA-Z0-9_=|:+*/`.?<&>%!~-]*/).desc('symbol'),
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
    document: rules => rules.expression.trim(parser.optWhitespace).many()
})