module.exports = (evaluate, [promise, ...handlers]) => {
  const evaluatedHandlers = handlers
    .map(handler => `.then(${evaluate(handler)})`)
    .join("");

  return `${evaluate(promise)}${evaluatedHandlers}`;
};
