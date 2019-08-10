

export default class StateWidgetModel {
  constructor({ name, descripton, type, default: defaultValue }) {
    let parsedDefault = defaultValue
    if (type === 'boolean') {
      parsedDefault = Boolean(parsedDefault)
    } else if (type === 'number') {
      parsedDefault = Number(parsedDefault) || 0 // 以防NaN
    } else if (type === 'string') {
      parsedDefault = String(parsedDefault)
    }
    this.name = name
    this.descripton = descripton
    this.originalType = type
    this.default = parsedDefault
  }
  get type() {
    if (this._type) return this._type
    this._type = this.parseOriginalType(this.originalType)
    return this._type
  }
  /**
   * 这个方法要能递归地分析 originalType
   * @param {string} originalType 
   */
  parseOriginalType(originalType) {
    if (/^boolean$|^string$|^number$/.test(originalType)) {
      return originalType
    } else {
      if (/^\[.*\|.*\]$/.test(originalType)) return 'enum'
      if (/^\(.*?\) => .*$/.test(originalType)) return 'function'
      if (/^{.*}$/.test(originalType)) return 'object'
      if (/^.*\|.*$/.test(originalType)) return 'radioGroup'
      if (/.*/.test(originalType)) return 'string'
    }
    console.warn(`can't get widgetType by typeString, set: ${originalType}`)
  }
}
