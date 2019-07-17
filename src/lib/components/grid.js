import React from 'react'
import { Row} from 'antd/es'

const componentName = 'grid'

export default {
  class: '布局',
  name: componentName,
  name_cn: '栅格',
  tags: ['antd'],
  icon: require('./icons')[componentName],
  Preview({ children, ...props }) {
    return <Row {...props}>{children}</Row>
  },
  api: [
    {
      
      title: 'Row',
      data: [
        {
          name: 'copyable',
          description: '是否可拷贝，为对象时可设置复制文本以回调函数',
          type: 'boolean | { text: string, onCopy: Function }',
          default: false
        },
        {
          name: 'delete',
          description: '添加删除线样式',
          type: 'boolean',
          default: false
        },
        {
          name: 'disabled',
          description: '禁用文本',
          type: 'boolean',
          default: false
        },
        {
          name: 'editable',
          description: '是否可编辑，为对象时可对编辑进行控制',
          type:
            'boolean | { editing: boolean, onStart: Function, onChange: Function(string) }',
          default: false
        },
        {
          name: 'ellipsis',
          description: '设置自动溢出省略',
          type: 'boolean',
          default: false
        },

        {
          name: 'mark',
          description: '添加标记样式',
          type: 'boolean',
          default: false
        },
        {
          name: 'underline',
          description: '添加下划线样式',
          type: 'boolean',
          default: false
        },
        {
          name: 'strong',
          description: '是否加粗',
          type: 'boolean',
          default: false
        },
        {
          name: 'type',
          description: '文本类型',
          type: 'secondary, warning, danger',
          default: '-'
        }
      ]
    },
    {
      
      title: 'Col',
      data: [
        {
          name: 'copyable',
          description: '是否可拷贝，为对象时可设置复制文本以回调函数',
          type: 'boolean | { text: string, onCopy: Function }',
          default: false
        },
        {
          name: 'delete',
          description: '添加删除线样式',
          type: 'boolean',
          default: false
        },
        {
          name: 'disabled',
          description: '禁用文本',
          type: 'boolean',
          default: false
        },
        {
          name: 'editable',
          description: '是否可编辑，为对象时可对编辑进行控制',
          type:
            'boolean | { editing: boolean, onStart: Function, onChange: Function(string) }',
          default: false
        },
        {
          name: 'ellipsis',
          description: '自动溢出省略，为对象时可设置省略行数与是否可展开等',
          type:
            'boolean | { rows: number, expandable: boolean, onExpand: Function }',
          default: false
        },
        {
          name: 'level',
          description: '重要程度，相当于 h1、h2、h3、h4',
          type: 'number: 1, 2, 3, 4',
          default: '1'
        },
        {
          name: 'mark',
          description: '添加标记样式',
          type: 'boolean',
          default: false
        },
        {
          name: 'underline',
          description: '添加下划线样式',
          type: 'boolean}',
          default: false
        },
        {
          name: 'onChange',
          description: '当用户提交编辑内容时触发',
          type: 'Function(string)',
          default: '-'
        },
        {
          name: 'type',
          description: '文本类型',
          type: 'secondary, warning, danger',
          default: '-'
        }
      ]
    }
  ]
}
