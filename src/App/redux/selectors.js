/**
 *
 * @param {object} store 只能从根目录的state，也就是store获取
 */
export const getComponentSetting = (store = {}) => store.componentSetting || {}
/**
 *
 * @param {object} state 只能从根目录的state，也就是store获取
 */
export const getAllComponents = (state = {}) => state.allComponents || {}

// export const getCriticalData = (store = {}) => ({
//   componentSetting: store.componentSetting || {}
// })
