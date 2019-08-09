import { combineReducers } from 'redux'
import ComponentModel from './models/ComponentModel'
import { isEqualWith } from 'lodash'

function componentCollection(state = {}, action = {}) {
  switch (action.type) {
    case 'componentCollection_settedProps_set': {
      const { key, value, defaultValue } = action
      const newSettedProps = { ...state.settedProps }
      if (
        value === state.settedProps[key] ||
        isEqualWith(value, defaultValue, (a, b) =>
          b === undefined ? a === Boolean(b) : undefined
        ) ||
        value === undefined
      ) {
        delete newSettedProps[key]
        return { ...state, settedProps: newSettedProps }
      } else {
        newSettedProps[key] = value
        return { ...state, settedProps: newSettedProps }
      }
    }
    case 'componentCollection_settedProps_cover': {
      const { all } = action
      return { ...state, settedProps: all }
    }
    case 'componentCollection_all_cover': {
      const { all } = action
      return {
        ...state,
        all: all.map(componentInfo => new ComponentModel(componentInfo))
      }
    }
    case 'componentCollection_currentName_set': {
      const { name } = action
      const prevName = state.currentName || 'button'
      const prevComponent = state.all.find(
        component => component.name === prevName
      )
      prevComponent.settedProps = state.settedProps
      const currComponent = state.all.find(component => component.name === name)
      return {
        ...state,
        settedProps: currComponent.settedProps,
        currentName: name
      }
    }
    default: {
      return state
    }
  }
}

export default combineReducers({
  componentCollection
})
