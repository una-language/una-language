// TODO function params flattening
// TODO async function params flattening

const transform = raw => {
    if (!Array.isArray(raw)) return raw
    if (raw.length === 1) return transform(raw[0])

    const [operator, ...params] = raw

    if (['=', '<-='].includes(operator))
        return { type: operator, children: [transform(params[0]), transform(params.slice(1))] }
    if (['<--', '=->'].includes(operator)) return { type: operator, children: [transform(params)] }
    return { type: operator, children: params.map(transform) }
}

module.exports = transform
