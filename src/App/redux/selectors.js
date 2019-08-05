export const selectAllComponents = (state = {}) => state.allComponent

export const getCriticalData = (store = {}) => ({
  componentSetting: store.componentSetting || {}
})
/**
 *
 * @param {object} store 只能从根目录的state，也就是store获取
 */
export const getComponentSetting = (store = {}) => store.componentSetting || {}
