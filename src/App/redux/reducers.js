import { combineReducers } from 'redux'

function currentProps(state = {}, action = {}) {
  switch (action.type) {
    case 'currentProps_set': {
      const { key, value } = action
      if (value === state[key]) {
        const newState = { ...state }
        delete newState[key]
        return newState
      } else {
        return { ...state, [key]: value }
      }
    }
    case 'currentProps_cover': {
      const { all } = action
      return all
    }
    case 'currentProps_delete': {
      const { key } = action
      const newState = { ...state }
      delete newState[key]
      return newState
    }
    default: {
      return state
    }
  }
}

function componentCollection(state = [], action = {}) {
  switch (action.type) {
    case 'componentCollection_cover': {
      const { all } = action
      return { ...state, all }
    }
    case 'componentCollection_setCurrentByName': {
      const { name } = action
      return { ...state, currentName: name }
    }
    default: {
      return state
    }
  }
}

export default combineReducers({
  currentProps,
  componentCollection
})
