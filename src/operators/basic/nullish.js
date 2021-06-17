module.exports = ({ nary, unary, validateParametersCount }) => [
  { match: '!!', translate: unary(), validate: validateParametersCount(1, 1) },
  { match: '??', translate: nary(), validate: validateParametersCount(2) }
]
