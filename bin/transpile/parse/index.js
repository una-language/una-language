const _ = require('lodash')

const structurize = (lines, spaces = 0) => {
  if (lines.length === 0) return []

  const line = lines[0]
  const isChild = line => line.search(/\S/) > spaces
  const children = _.takeWhile(lines.slice(1), isChild)
  const tail = _.drop(lines, children.length + 1)
  const structure = { line: line.trim(), children: structurize(children, spaces + 2) }

  return [structure].concat(structurize(tail, spaces))
}

const tokenizeStructure = ({ line, children }) => {
  const tokenize = (line, tree = [], stack = []) => {
    if (line.length === 0) return tree

    const lineTail = headLength => line.substring(headLength, line.length)
    if (/^\s/.exec(line)) return tokenize(lineTail(1), tree, stack)

    const inSingleQuotes = /^'(.*?)'/.exec(line)
    if (inSingleQuotes) return tokenize(lineTail(inSingleQuotes[0].length), tree.concat(inSingleQuotes[0]), stack)

    const inDoubleQuotes = /^"(.*?)"/.exec(line)
    if (inDoubleQuotes) return tokenize(lineTail(inDoubleQuotes[0].length), tree.concat(inDoubleQuotes[0]), stack)

    if (/^\(/.exec(line)) return tokenize(lineTail(1), [], stack.concat([tree]))

    if (/^\)/.exec(line)) {
      const parentTree = stack.pop()
      return tokenize(lineTail(1), parentTree ? parentTree.concat([tree]) : tree, stack)
    }

    const token = /^[^\s\(\)]+/.exec(line)[0]
    return tokenize(lineTail(token.length), tree.concat(token), stack)
  }

  const lineTokens = tokenize(line)
  const childrenTokens = children.map(tokenizeStructure)
  return lineTokens.concat(childrenTokens)
}

const makeTree = expression =>
  Array.isArray(expression)
    ? { value: expression[0], children: expression.slice(1).map(makeTree) }
    : { value: expression }

module.exports = code => {
  const lines = code.includes('\n') ? code.split('\n') : [code]
  const nonEmptyLines = lines.filter(line => line.trim())
  const structure = structurize(nonEmptyLines)
  return structure.map(tokenizeStructure).map(makeTree)
}
