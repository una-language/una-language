module.exports = ({ nary, validateParametersCount }) => [
  { match: '>', translate: nary(), validate: validateParametersCount(2, 2) },
  { match: '>=', translate: nary(), validate: validateParametersCount(2, 2) },
  { match: '<', translate: nary(), validate: validateParametersCount(2, 2) },
  { match: '<=', translate: nary(), validate: validateParametersCount(2, 2) },
  { match: '==', translate: nary('==='), validate: validateParametersCount(2, 2) },
  { match: '~=', translate: nary('=='), validate: validateParametersCount(2, 2) },
  { match: '!=', translate: nary('!=='), validate: validateParametersCount(2, 2) },
  { match: '!~=', translate: nary('!='), validate: validateParametersCount(2, 2) }
]
