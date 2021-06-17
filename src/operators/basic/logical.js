module.exports = ({ nary, unary, validateParametersCount }) => [
  { match: '&', translate: nary('&&'), validate: validateParametersCount(2) },
  { match: '|', translate: nary('||'), validate: validateParametersCount(2) },
  { match: '!', translate: unary(), validate: validateParametersCount(1, 1) }
]
