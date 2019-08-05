import { createStore } from 'redux'
import reducers from './reducers'
import * as myLibrary from '../../lib'

const initialState = {
  componentSetting: {},
  allComponents: []
}

export default createStore(reducers, initialState)
