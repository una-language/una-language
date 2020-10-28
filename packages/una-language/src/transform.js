// TODO function params flattening
// TODO async function params flattening

const transform = raw => {
    if (!Array.isArray(raw)) return raw
    if (raw.length === 0) return raw
    if (raw.length === 1) return transform(raw[0])

    const [value, ...children] = raw

    if (['='].includes(value)) return [value, transform(children[0]), transform(children.slice(1))]
    if (['<--', '<-='].includes(value)) return [value, transform(children)]
    if (['->', '-->'].includes(value)) {
        const parameters = Array.isArray(children[0]) ? children[0].map(transform) : children[0]
        return [value, parameters, ...children.slice(1).map(transform)]
    }

    return raw.map(transform)
}

module.exports = transform
