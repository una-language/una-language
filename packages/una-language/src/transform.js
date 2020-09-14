const transform = raw => {
    if (!Array.isArray(raw)) return raw
    if (raw.length === 1) return raw[0]

    const [operator, ...params] = raw
    if (operator === '=') return { type: '=', children: [params[0], transform(params.slice(1))] }
    return { type: operator, children: params.map(transform) }
}

module.exports = transform
