import { combineReducers } from 'redux'

function componentSetting(state = {}, action = {}) {
  switch (action.type) {
    case 'componentSetting_set': {
      const { key, value } = action
      if (value === state[key]) {
        const newState = { ...state }
        delete newState[key]
        return newState
      } else {
        return { ...state, [key]: value }
      }
    }
    case 'componentSetting_cover': {
      const { config } = action
      return config
    }
    case 'componentSetting_delete': {
      const { key } = action
      const newState = { ...state }
      delete newState[key]
      return newState
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
