import { createStore } from 'redux'
import reducers from './reducers'

const initialState = {
  // currentProps: {},
  // componentCollection: {
  //   currentName: '',
  //   all: []
  // }
}

export default createStore(reducers, initialState)
