import { createStore } from 'redux'
import reducers from './reducers'

const initialState = {
  setting: {}
}

export default createStore(reducers, initialState)
