module.exports = config => ({
  customTransformRules: config.customTransformRules || {},
  customTranlateRules: config.customTranlateRules || {},
  modules: config.modules || 'import' // 'import' || 'require'
})
