export default class StateWidgetModel {
  constructor({ data, _originalFormat, _rule }) {
    this._data = data
    this._originalFormat = _originalFormat
    this._rule = _rule
  }
  get hasData() {
    return Boolean(this._data)
  }
  set onSetData(valueFn) {
    this._onSetData = valueFn
  }
  set onGetData(valueFn) {
    this._onGetData = valueFn
  }
  setData(data, needFormat = true) {
    if (needFormat === true) data = this._formatData(data)
    this._data = data
    if (this._onSetData) this.onSetData()
  }
  getData() {
    if (this._onGetData) this._onGetData()
    return this._data
  }
  _formatData(data) {
    return data
  }
}
