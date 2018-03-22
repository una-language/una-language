const _ = require('lodash')

const structurize = (lines, spaces = 0) => {
  if (lines.length === 0) return []

  const line = lines[0]
  const isChild = line => line.spaces > spaces
  const children = _.takeWhile(lines.slice(1), isChild)
  const tail = _.drop(lines, children.length + 1)
  const structure = {
    line: line.value,
    children: structurize(children, spaces + 2)
  }

  return [structure].concat(structurize(tail, spaces))
}

module.exports = lines => {
  const linesWithCountedSpaces = lines.map(line => ({
    value: line.trim(),
    spaces: line.search(/\S/)
  }))

  return structurize(linesWithCountedSpaces)
}
