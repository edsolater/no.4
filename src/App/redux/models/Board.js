import store from '../store'

export default class Board {
  constructor({
    id = Date.now(),
    type = ['userBoard', 'shelfBoard'][0],
    name = 'unnamed',
    items = []
  } = {}) {
    this.id = id
    this.type = type
    this.name = name
    this.items = items
    Board.addInstance(this)
  }
  static instances = []
  static addInstance(newInstance) {
    Board.instances.push(newInstance)
  }
  get _storeState() {
    return store.getState()
  }
  get _dispatch() {
    return store.dispatch
  }
  cloneSelf() {}
}
window.Board = Board
