export const componentSetting_set = (key, value) => ({
  type: 'componentSetting_set',
  key,
  value
})
export const componentSetting_delete = key => ({
  type: 'componentSetting_delete',
  key
})
export const componentSetting_cover = config => ({
  type: 'componentSetting_cover',
  config
})
