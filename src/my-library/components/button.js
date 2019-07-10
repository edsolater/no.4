const componentName = 'button'
let icon
try {
  icon = require('./icons')[componentName]
} catch (e) {
  console.log('e: ', e)
}

const allComponents = {
  class: 'general',
  name: componentName,
  icon: icon,
  async getMarkdownAsync() {
    try {
      const fillPath = require('./doc')[componentName]
      const res = await fetch(fillPath)
      const text = await res.text()
      return text
    } catch (e) {
      console.log('e: ', e)
      return undefined
    }
  },
  api: [
    {
      type: 'comment',
      content:
        '通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：type -> shape -> size -> loading -> disabled。'
    },
    {
      type: 'table',
      title: 'Button',
      data: [
        {
          property: 'disabled',
          description: '按钮失效状态',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'ghost',
          description: '幽灵属性，使按钮背景透明，版本 2.7 中增加',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'href',
          description: '点击跳转的地址，指定此属性 button 的行为和 a 链接一致',
          type: 'string',
          default: '-'
        },
        {
          property: 'htmlType',
          description: '设置 button 原生的 type 值，可选值请参考 HTML 标准',
          type: 'string',
          default: 'button'
        },
        {
          property: 'icon',
          description: '设置按钮的图标类型',
          type: 'string',
          default: '-'
        },
        {
          property: 'loading',
          description: '设置按钮载入状态',
          type: 'boolean | { delay: number }',
          default: 'false'
        },
        {
          property: 'shape',
          description: '设置按钮形状，可选值为 circle、 round 或者不设',
          type: 'string',
          default: '-'
        },
        {
          property: 'size',
          description: '设置按钮大小，可选值为 small large 或者不设',
          type: 'string',
          default: 'default'
        },
        {
          property: 'target',
          description: '相当于 a 链接的 target 属性，href 存在时生效',
          type: 'string',
          default: '-'
        },
        {
          property: 'type',
          description:
            '设置按钮类型，可选值为 primary dashed danger link(3.17 中增加) 或者不设',
          type: 'string',
          default: '-'
        },
        {
          property: 'onClick',
          description: '点击按钮时的回调',
          type: '(event) => void',
          default: '-'
        },
        {
          property: 'block',
          description: '将按钮宽度调整为其父宽度的选项',
          type: 'boolean',
          default: 'false'
        }
      ],
      notifacion: '支持原生 button 的其他所有属性。'
    }
  ]
}

export default allComponents
