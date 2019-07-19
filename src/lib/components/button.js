import React from 'react'
import { Button } from 'antd/es'

const componentName = 'button'

export default {
  class: '通用',
  name: componentName,
  name_cn: '按钮',
  tags: ['antd'],
  icon: require('./icons')[componentName],
  Preview({ children, ...props }) {
    return <Button {...props}>{children}</Button>
  },
  reactProps: {
    Button: [
      {
        name: 'copyable',
        description: '是否可拷贝，为对象时可设置复制文本以回调函数',
        type: '{ text: string, onCopy: (e) => void }',
        default: { text: 'hello' }
      },
      {
        name: 'children',
        description: '按钮中间显示的文字，可能不是文字也行',
        type: 'any',
        default: undefined
      },
      {
        name: 'disabled',
        description: '按钮失效状态',
        type: 'boolean',
        default: false
      },
      {
        name: 'ghost',
        description: '幽灵属性，使按钮背景透明，版本 2.7 中增加',
        type: 'boolean',
        default: true
      },
      {
        name: 'href',
        description: '点击跳转的地址，指定此属性 button 的行为和 a 链接一致',
        type: 'string',
        default: 'world'
      },
      {
        name: 'htmlType',
        description: '设置 button 原生的 type 值，可选值请参考 HTML 标准',
        type: 'string',
        default: 'button'
      },
      {
        name: 'icon',
        description: '设置按钮的图标类型',
        type: 'string',
        default: undefined
      },
      {
        name: 'loading',
        description: '设置按钮载入状态',
        type: 'boolean | { delay: number, text: string }',
        // default: { delay: 3 }
      },
      {
        name: 'shape',
        description: '设置按钮形状，可选值为 circle、 round 或者不设',
        type: "['circle' | 'round']",
        default: undefined
      },
      {
        name: 'size',
        description: '设置按钮大小',
        type: "['small' | 'large']",
        default: undefined
      },
      {
        name: 'target',
        description: '相当于 a 链接的 target 属性，href 存在时生效',
        type: 'string',
        default: undefined
      },
      {
        name: 'type',
        description:
          '设置按钮类型，可选值为 primary dashed danger link(3.17 中增加) 或者不设',
        type: "['primary' | 'dashed' | 'danger' | 'link']",
        default: undefined
      },
      {
        name: 'onClick',
        description: '点击按钮时的回调',
        type: '(event, number) => void',
        default: undefined
      },
      {
        name: 'block',
        description: '将按钮宽度调整为其父宽度的选项',
        type: 'boolean',
        default: false
      }
    ]
  },
  presets: [
    {
      children: 'BUTTON',
      type: 'dashed'
    }
  ]
}
