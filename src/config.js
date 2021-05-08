module.exports = config => ({
  customTransformRules: config.customTransformRules || {},
  customTranslateRules: config.customTranslateRules || {},
  modules: config.modules || 'import' // 'import' || 'require'
})
