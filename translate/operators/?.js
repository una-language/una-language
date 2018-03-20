module.exports = (evaluate, [condition, primary, alternative]) =>
  `(${evaluate(condition)} ? ${evaluate(primary)} : ${evaluate(alternative)})`
