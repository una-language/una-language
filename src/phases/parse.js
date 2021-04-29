const _ = require('lodash')
const parser = require('./parse.rules')

const convertTabs = lines => {
  if (lines.length === 0) return ''
  const [head, ...tail] = lines
  const sublines = _.takeWhile(tail, line => line.level > head.level)
  const currentExpression = `( ${head.value} ${convertTabs(sublines)})`
  const nextExpressions = convertTabs(_.drop(tail, sublines.length))
  return currentExpression + (head.level === 0 && nextExpressions.length > 0 ? '\n' : '') + nextExpressions
}

module.exports = config => text => {
  if (!text.trim()) return []

  const lines = text.split('\n').filter(line => line.trim())
  const indentedLines = lines.map(line => ({ level: line.search(/\S/) / 2, value: line.trim() }))
  const code = convertTabs(indentedLines)
  return parser.document.tryParse(code)
}
