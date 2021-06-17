module.exports = ({ nary, optionary, validateParametersCount }) => [
  { match: '+', translate: nary(), validate: validateParametersCount(2) },
  { match: '-', translate: optionary(), validate: validateParametersCount(1) },
  { match: '*', translate: nary(), validate: validateParametersCount(2) },
  { match: '**', translate: nary(), validate: validateParametersCount(2) },
  { match: '/', translate: nary(), validate: validateParametersCount(2) },
  { match: '%', translate: nary(), validate: validateParametersCount(2) }
]
