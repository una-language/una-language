module.exports = (evaluate, lines) => {
  const last = evaluate(lines[lines.length - 1])
  const body =
    lines.length > 1
      ? lines
          .slice(0, -1)
          .map(evaluate)
          .map(line => `${line};`)
          .join(' ')
      : []

  return `function(){${body} return ${last}}`
}
