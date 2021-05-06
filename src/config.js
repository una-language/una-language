module.exports = config => ({
  modules: config.modules || 'import', // 'import' || 'require'
  rules: {
    transform: config.rules?.transform ?? {},
    translate: config.rules?.translate ?? {}
  }
})
