import React from 'react'
import { Button } from 'antd/es'

const componentName = 'button'

// 有效属性及其用法见相应model componentInfo
export default {
  class: '通用',
  name: componentName,
  name_cn: '按钮',
  tags: ['antd'],
  icon: require('./icons')[componentName], //TODO:需要把名字
  Preview({ children, ...props }) {
    return <Button {...props}>{children}</Button>
  },
  reactProps: {
    // name、 type 为必须提供，不然UI会出现怪异的空白、报错
    // description、default 是可选的
    // enum类型必须写在trpe的开头，不然无法准确断句，程序会死循环
    main: [
      {
        name: 'children',
        description: '按钮中间显示的文字，可能不是文字也行',
        type: 'any' // TODO:我觉得应该能把type去除
      },
      {
        name: 'disabled',
        description: '按钮失效状态',
        type: 'boolean',
      },
      {
        name: 'ghost',
        description: '幽灵属性，使按钮背景透明，版本 2.7 中增加',
        type: 'boolean'
      },
      {
        name: 'href',
        description: '点击跳转的地址，指定此属性 button 的行为和 a 链接一致',
        type: 'string'
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
        type: 'string'
      },
      {
        name: 'loading',
        description: '设置按钮载入状态',
        type: 'boolean | { delay: number }',
      },
      {
        name: 'shape',
        description: '设置按钮形状，可选值为 circle、 round 或者不设',
        type: "'circle' | 'round'"
      },
      {
        name: 'size',
        description: '设置按钮大小',
        type: "'small' | 'large'",
      },
      {
        name: 'target',
        description: '相当于 a 链接的 target 属性，href 存在时生效',
        type: 'string'
      },
      {
        name: 'type',
        description:
          '设置按钮类型，可选值为 primary dashed danger link(3.17 中增加) 或者不设',
        type: "'primary' | 'dashed' | 'danger' | 'link'|number"
      },
      {
        name: 'onClick',
        description: '点击按钮时的回调',
        type: '(event, number) => void'
      },
      {
        name: 'block',
        description: '将按钮宽度调整为其父宽度的选项',
        type: 'boolean'
      }
    ]
  },
  presets: [
    {
      children: 'BUTTON',
      type: 'primary',
      disabled:true,
      size:'small',
      loading:true
    },
    {
      children: '2222222',
      type: 'dashed'
    }
  ]
}
