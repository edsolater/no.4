import { createStore } from 'redux'
import reducers from './reducers'

const initialState = {
  // componentCollection: {
    // settedProps: {},
  //   currentName: '',
  //   all: []
  // }
}

export default createStore(reducers, initialState)
