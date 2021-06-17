module.exports = () => [
  {
    match: '`',
    translate: (translate, operator, operands) => {
      const firstChild = Array.isArray(operands[0]) ? operands[0][0] : operands[0]
      const hasIdentifier = typeof firstChild === 'string' && !firstChild.startsWith("'") && !firstChild.startsWith('"')
      const identifier = hasIdentifier ? translate(operands[0]) : ''
      const lines = operands.slice(hasIdentifier ? 1 : 0)

      const interpolatedString = lines
        .map(line => {
          if (typeof line === 'string') return line.substring(1, line.length - 1)

          const [string, ...substitutions] = line
          return substitutions.reduce(
            (accumulator, substitution, index) =>
              accumulator.replace(new RegExp(`(?<!\\\\)\\$\\{${index}\\}`, 'g'), `\${${translate(substitution)}}`),
            string.substring(1, string.length - 1)
          )
        })
        .join('\n')
      return `${identifier}\`${interpolatedString}\``
    }
  }
]
