const _ = require('lodash')
const parseParenthesises = require('parenthesis')

const clean = ([head, ...tail]) => {
  if (!head) return []
  if (Array.isArray(head)) return [clean(head), ...clean(tail)]

  const cleanedHead = head
    .replace('(', '')
    .replace(')', '')
    .trim()
    .split(' ')
    .filter(nonEmpty => nonEmpty)

  return [...cleanedHead, ...clean(tail)]
}

const structurize = ([head, ...tail], spaces = 0) => {
  if (!head) return []

  const children = _.takeWhile(tail, line => line.search(/\S/) > spaces)
  const headStructure = clean(parseParenthesises(head, { brackets: ['()'] }))
  const childrenStructure = structurize(children, spaces + 2)
  const nextStructure = structurize(_.drop(tail, children.length), spaces)
  const structure = [...headStructure, ...childrenStructure]

  return structure.length > 1 ? [structure, ...nextStructure] : [...headStructure, ...nextStructure]
}

module.exports = code => structurize(code.split('\n').filter(line => line.trim()))
