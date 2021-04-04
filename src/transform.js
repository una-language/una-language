const pipeline = (children, orderFirst) => {
    if (children.length === 1) return children
    const [first, second, ...rest] = children
    const application =
        Array.isArray(second) && typeof second !== 'string'
            ? orderFirst
                ? [second[0], first, ...second.slice(1)]
                : [...second, first]
            : [second, first]
    return pipeline([application, ...rest], orderFirst)
}

const func = (transform, value, children) => {
    const parameters = Array.isArray(children[0]) ? children[0].map(transform) : children[0]
    return [value, parameters, ...children.slice(1).map(transform)]
}

const transformRules = {
    '=': (transform, value, children) => [value, transform(children[0]), transform(children.slice(1))],
    '<-=': (transform, value, children) => [value, transform(children)],
    '->': func,
    '-->': func,
    '<|': (transform, value, children) => transform(pipeline(children, true)),
    '|>': (transform, value, children) => transform(pipeline(children, false))
}

const transform = raw => {
    if (!Array.isArray(raw)) return raw
    if (raw.length === 0) return raw
    if (raw.length === 1) return transform(raw[0])

    const [value, ...children] = raw
    return transformRules.hasOwnProperty(value) ? transformRules[value](transform, value, children) : raw.map(transform)
}

module.exports = transform
