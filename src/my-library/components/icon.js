import { Icon } from './icons'
const componentInfo = {
  class: 'general',
  name: 'Icon',
  icon: Icon,
  api: [
    {
      type: 'table',
      title: 'Icon',
      data: [
        {
          property: 'type',
          description: '图标类型。遵循图标的命名规范',
          type: 'string',
          default: '-'
        },
        {
          property: 'style',
          description: '设置图标的样式，例如 fontSize 和 color',
          type: 'CSSProperties',
          default: '-'
        },
        {
          property: 'theme',
          description:
            '图标主题风格。可选实心、描线、双色等主题风格，适用于官方图标',
          type: "'filled' | 'outlined' | 'twoTone'",
          default: "'filled' | 'outlined' | 'twoTone'"
        },
        {
          property: 'spin',
          description: '是否有旋转动画',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'rotate',
          description: '图标旋转角度（3.13.0 后新增，IE9 无效）',
          type: 'number',
          default: '-'
        },
        {
          property: 'component',
          description:
            '控制如何渲染图标，通常是一个渲染根标签为 <svg> 的 React 组件，会使 type 属性失效',
          type: 'ComponentType<CustomIconComponentProps>',
          default: '-'
        },
        {
          property: 'twoToneColor',
          description: '仅适用双色图标。设置双色图标的主要颜色',
          type: 'string (十六进制颜色)',
          default: '-'
        }
      ]
    }
  ]
}

export default componentInfo
