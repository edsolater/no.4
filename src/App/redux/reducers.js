import { combineReducers } from 'redux'
import ComponentModel from './models/ComponentModel'

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
      return {
        ...state,
        all: all.map(componentInfo => new ComponentModel(componentInfo))
      }
    }
    case 'componentCollection_setCurrent_string': {
      const { name } = action
      return { ...state, currentName: name }
    }
    case 'componentCollection_setCurrent_object': {
      const { componentInfo } = action
      return { ...state, currentName: componentInfo.name }
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
