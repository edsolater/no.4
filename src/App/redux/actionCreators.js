export const componentSetting_set = (key, value) => ({
  type: 'componentSetting_set',
  key,
  value
})
export const componentSetting_delete = key => ({
  type: 'componentSetting_delete',
  key
})
export const componentSetting_cover = setting => ({
  type: 'componentSetting_cover',
  config: setting
})
export const allComponents_cover = allComponents => ({
  type: 'allComponents_cover',
  config: allComponents
})

export const currentSelection_change = config => ({
  type: 'currentSelection_change',
  config
})
