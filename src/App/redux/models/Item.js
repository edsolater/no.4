import store from '../store'
import { changeItemLocation } from '../actionCreators'
import { getActiveShelfBoard } from '../selectors'

export default class Item {
  constructor({
    id = Date.now(),
    type = ['normal', 'identifier', 'button'][0],
    location = 'getActiveShelfBoard(store.getState() && store.getState().shelfBoards)',
    title = 'NO title',
    subtitle = 'NO subtitle'
  }) {
    this.id = id
    this.type = type
    this.location = location
    this.title = title
    this.subtitle = subtitle
    Item.addInstance(this)
  }
  static instances = []
  static addInstance(newInstance) {
    Item.instances.push(newInstance)
  }
  get _storeState() {
    return store.getState()
  }
  get _dispatch() {
    return store.dispatch
  }
  copyTo(board) {
    this._dispatch(changeItemLocation(board))
  }
}

window.Item = Item
