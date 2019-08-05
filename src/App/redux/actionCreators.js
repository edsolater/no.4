import store from './store'

export const updateSetting = (type, payload) => {
  return { type: `setting_${type}`, ...payload }
}
