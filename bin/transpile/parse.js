const _ = require('lodash')
const parseParenthesises = require('parenthesis')

const clean = ([head, ...tail], substitutions) => {
  if (!head) return []

  const cleanedTail = clean(tail, substitutions)

  if (Array.isArray(head)) return [clean(head, substitutions), ...cleanedTail]

  const cleanedHead = head
    .replace('(', '')
    .replace(')', '')
    .trim()
    .split(' ')
    .filter(nonEmpty => nonEmpty)
    .map(token => (substitutions.hasOwnProperty(token) ? '`' + substitutions[token] + '`' : token))

  return [...cleanedHead, ...cleanedTail]
}

const structurize = ([head, ...tail], spaces = 0) => {
  if (!head) return []

  const substitutions = Object.assign(
    {},
    ...parseParenthesises(head, { brackets: ["''"] })
      .filter(Array.isArray)
      .map(token => ({ [`$#${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`]: token[0] }))
  )
  let text = head
  Object.keys(substitutions).forEach(id => (text = text.replace(`'${substitutions[id]}'`, `${id}`)))

  const children = _.takeWhile(tail, line => line.search(/\S/) > spaces)
  const headStructure = clean(parseParenthesises(text, { brackets: ['()'] }), substitutions)
  const childrenStructure = structurize(children, spaces + 2)
  const nextStructure = structurize(_.drop(tail, children.length), spaces)
  const structure = [...headStructure, ...childrenStructure]

  return structure.length > 1 ? [structure, ...nextStructure] : [...headStructure, ...nextStructure]
}

module.exports = code => structurize(code.split('\n').filter(line => line.trim()))
