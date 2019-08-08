export default class FormWidgetModel {
  constructor({ data, _originalFormat, _rule }) {
    this.data = data
    this._originalFormat = _originalFormat
    this._rule = _rule
  }
  get hasData() {
    return Boolean(this.data)
  }
  set onDataChange(valueFn) {
    this._onDataChange = valueFn
  }
  setData(data, needFormat = true) {
    if (needFormat === true) data = this._formatData(data)
    this.data = data
    if (this._onDataChange) this.onDataChange()
  }
  _formatData(data) {
    return data
  }
}
