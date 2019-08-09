import { combineReducers } from 'redux'
import ComponentModel from './models/ComponentModel'

function componentCollection(state = {}, action = {}) {
  switch (action.type) {
    case 'settedProps_set': {
      const { key, value } = action
      if (value === state[key]) {
        const newSettedProps = { ...state.settedProps }
        delete newSettedProps[key]
        return {...state, settedProps:newSettedProps}
      } else {
        const newSettedProps = { ...state.settedProps }
        newSettedProps[key] = value
        return {...state, settedProps:newSettedProps}
      }
    }
    case 'settedProps_cover': {
      const { all } = action
      return {...state, settedProps:all}
    }
    case 'settedProps_delete': {
      const { key } = action
      const newSettedProps = { ...state.settedProps }
      delete newSettedProps[key]
      return {...state, settedProps:newSettedProps}
    }
    case 'componentCollection_cover': {
      const { all } = action
      return {
        ...state,
        all: all.map(componentInfo => new ComponentModel(componentInfo))
      }
    }
    case 'componentCollection_setCurrent': {
      const { name } = action
      const prevName = state.currentName || 'button'
      const prevComponent  = state.all.find(component=>component.name === prevName)
      prevComponent.settedProps = state.settedProps
      const currComponent = state.all.find(component=>component.name === name)
      return { ...state, settedProps: currComponent.settedProps, currentName: name }
    }
    default: {
      return state
    }
  }
}

export default combineReducers({
  componentCollection
})
