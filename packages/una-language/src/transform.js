//TODO add expansion for assignment like this = a + 1 2
//TODO add expansion for await like this = result <-- fetch 'GET' 'posts' (: id 1)

const transform = raw => {
    if (!Array.isArray(raw)) return raw
    if (raw.length === 1) return transform(raw[0])

    const [operator, ...params] = raw

    if (operator === '=')
        return { type: '=', children: [transform(params[0]), transform(params.slice(1))] }
    if (operator === '<--') return { type: '<--', children: [transform(params)] }
    return { type: operator, children: params.map(transform) }
}

module.exports = transform
