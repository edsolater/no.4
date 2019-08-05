import { combineReducers } from 'redux'

function componentSetting(state = {}, action = {}) {
  switch (action.type) {
    case 'componentSetting_set': {
      const { key, value, config } = action
      if (key) return { ...state, [key]: value }
      if (config) return { ...state, config }
    }
    case 'componentSetting_cover': {
      console.log('action: ', action)
      const { config } = action
      return config
    }
    case 'componentSetting_delete': {
      const { key, value, config } = action
      if (key) return { ...state, [key]: value }
      if (config) return { ...state, config }
    }
    default: {
      console.warn(
        `unknown action type(${action.type}) for dashboard componentSetting`
      )
      return state
    }
  }
}

export default combineReducers({ componentSetting })
