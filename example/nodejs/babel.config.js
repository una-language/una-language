module.exports = function (api) {
    api.cache(true)
    return {
        plugins: [['una-language', { modules: 'require' }]]
    }
}
