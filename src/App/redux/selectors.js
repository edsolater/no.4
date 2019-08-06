export const getComponentSetting = (store = {}) => store.currentProps || {}

export const getAllComponents = (store = {}) =>
  Object.values(store.componentCollection.all) || []

export const getCurrentSelection = (store = {}) =>
  store.componentCollection.all[store.componentCollection.currentName] || {}

export const getCurrentSelectionName = (store = {}) =>
  store.componentCollection.currentName || ''

// export const getCriticalData = (store = {}) => ({
//   currentProps: store.currentProps || {}
// })
