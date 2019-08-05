import { combineReducers } from 'redux'

function setting(state = {}, action = {}) {
  switch (action.type) {
    case 'setting_set': {
      const { key, value, config } = action
      if (key) return { ...state, [key]: value }
      if (config) return { ...state, config }
    }
    case 'setting_cover': {
      const { config } = action
      return config
    }
    case 'setting_delete': {
      const { key, value, config } = action
      if (key) return { ...state, [key]: value }
      if (config) return { ...state, config }
    }
    default: {
      // throw new Error(
      //   `unknown action type(${action.type}) for dashboard setting`
      // )
      console.log(action)
      return null
    }
  }
}

export default combineReducers({ setting })
