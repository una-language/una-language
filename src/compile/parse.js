const _ = require('lodash')

const convertTabs = lines => {
  if (lines.length === 0) return ''
  const [head, ...tail] = lines
  const sublines = _.takeWhile(tail, line => line.level > head.level)
  const currentExpression = `( ${head.value} ${convertTabs(sublines)})`
  const nextExpressions = convertTabs(_.drop(tail, sublines.length))
  return currentExpression + (head.level === 0 && nextExpressions.length > 0 ? '\n' : '') + nextExpressions
}

module.exports = lines => {
  const indentedLines = lines.map(line => ({ level: line.search(/\S/) / 2, value: line.trim() }))
  const lispLines = convertTabs(indentedLines)
}
