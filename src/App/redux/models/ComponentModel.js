export default class ComponentModel {
  /**
   *
   * @param {object} [data]
   * @param {string} [data.class] 规定了组件的所属类别
   * @param {string} [data.class] 规定了组件的所属类别, class 的别称
   * @param {string} [data.name] 组件的名称
   * @param {string} [data.name_en] 组件的英文名
   * @param {string} [data.name_cn] 组件的中文名
   * @param {string[]|string} [data.tags] 组件的标签
   * @param {JSX.Element} [data.icon] 附带Icon组件的未激活状态，以便调用时传入props
   * @param {React.ReactComponentElement} [data.Preview] 附带Preview组件的未激活状态，以便调用时传入props
   * @param {object} [data.reactProps] //TODO:
   * @param {Array} [data.presets]
   */
  constructor({
    class: className = '其他',
    name = '',
    name_en = name,
    name_cn = '未设定',
    tags,
    icon = () => null,
    Icon = icon,
    Preview = () => null,
    reactProps = { main: [] },
    presets = [{}]
  } = {}) {
    this.class = className
    this.name = name_en.toLowerCase()
    this.name_en = name_en.toLowerCase()
    this.name_cn = name_cn
    this.tags = [tags].flat()
    this.icon = icon
    this.Icon = Icon
    this.Preview = Preview
    this.reactProps = reactProps
    this.presets = presets

    this.settedProps = undefined // 初始化挂载的设定参数
  }
  static say() {
    console.log('hello')
  }
}
