export const selectAllComponents = (state = {}) => state.allComponent

export const selectCriticalData = (store = {}) => ({
  componentSetting: store.componentSetting || {}
})

export const selectComponentSetting = (store = {}) => store.componentSetting || {}
