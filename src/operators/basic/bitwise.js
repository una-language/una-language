module.exports = ({ nary, unary, validateParametersCount }) => [
  { match: '_&', translate: nary('&'), validate: validateParametersCount(2) },
  { match: '_|', translate: nary('|'), validate: validateParametersCount(2) },
  { match: '_!', translate: unary('~'), validate: validateParametersCount(1, 1) },
  { match: '_^', translate: nary('^'), validate: validateParametersCount(2) },
  { match: '_>>', translate: nary('>>'), validate: validateParametersCount(2) },
  { match: '_>>>', translate: nary('>>>'), validate: validateParametersCount(2) },
  { match: '_<<', translate: nary('<<'), validate: validateParametersCount(2) }
]
