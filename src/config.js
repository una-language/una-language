module.exports = config => ({
  customOperators: config.customOperators || [],
  modules: config.modules || 'import' // 'import' | 'require'
})
