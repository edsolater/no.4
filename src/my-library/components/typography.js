import { Typography } from './icons'
const componentInfo = {
  class: 'general',
  name: 'Typography',
  icon: Typography,
  api: [
    {
      type: 'table',
      title: 'Typography.Text',
      data: [
        {
          property: 'copyable',
          description: '是否可拷贝，为对象时可设置复制文本以回调函数',
          type: 'boolean | { text: string, onCopy: Function }',
          default: 'false'
        },
        {
          property: 'delete',
          description: '添加删除线样式',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'disabled',
          description: '禁用文本',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'editable',
          description: '是否可编辑，为对象时可对编辑进行控制',
          type:
            'boolean | { editing: boolean, onStart: Function, onChange: Function(string) }',
          default: 'false'
        },
        {
          property: 'ellipsis',
          description: '设置自动溢出省略',
          type: 'boolean',
          default: 'false'
        },

        {
          property: 'mark',
          description: '添加标记样式',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'underline',
          description: '添加下划线样式',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'strong',
          description: '是否加粗',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'type',
          description: '文本类型',
          type: 'secondary, warning, danger',
          default: '-'
        }
      ]
    },
    {
      type: 'table',
      title: 'Typography.Title',
      data: [
        {
          property: 'copyable',
          description: '是否可拷贝，为对象时可设置复制文本以回调函数',
          type: 'boolean | { text: string, onCopy: Function }',
          default: 'false'
        },
        {
          property: 'delete',
          description: '添加删除线样式',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'disabled',
          description: '禁用文本',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'editable',
          description: '是否可编辑，为对象时可对编辑进行控制',
          type:
            'boolean | { editing: boolean, onStart: Function, onChange: Function(string) }',
          default: 'false'
        },
        {
          property: 'ellipsis',
          description: '自动溢出省略，为对象时可设置省略行数与是否可展开等',
          type:
            'boolean | { rows: number, expandable: boolean, onExpand: Function }',
          default: 'false'
        },
        {
          property: 'level',
          description: '重要程度，相当于 h1、h2、h3、h4',
          type: 'number: 1, 2, 3, 4',
          default: '1'
        },
        {
          property: 'mark',
          description: '添加标记样式',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'underline',
          description: '添加下划线样式',
          type: 'boolean}',
          default: 'false'
        },
        {
          property: 'onChange',
          description: '当用户提交编辑内容时触发',
          type: 'Function(string)',
          default: '-'
        },
        {
          property: 'type',
          description: '文本类型',
          type: 'secondary, warning, danger',
          default: '-'
        }
      ]
    },
    {
      type: 'table',
      title: 'Typography.Paragraph',
      data: [
        {
          property: 'copyable',
          description: '是否可拷贝，为对象时可设置复制文本以回调函数',
          type: 'boolean | { text: string, onCopy: Function }',
          default: 'false'
        },
        {
          property: 'delete',
          description: '添加删除线样式',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'disabled',
          description: '禁用文本',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'editable',
          description: '是否可编辑，为对象时可对编辑进行控制',
          type:
            'boolean | { editing: boolean, onStart: Function, onChange: Function(string) }',
          default: 'false'
        },
        {
          property: 'ellipsis',
          description: '设置自动溢出省略',
          type: 'boolean',
          default: 'false'
        },

        {
          property: 'mark',
          description: '添加标记样式',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'underline',
          description: '添加下划线样式',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'onChange',
          description: '当用户提交编辑内容时触发',
          type: 'Function(string)',
          default: '-'
        },
        {
          property: 'strong',
          description: '是否加粗',
          type: 'boolean',
          default: 'false'
        },
        {
          property: 'type',
          description: '文本类型',
          type: 'secondary, warning, danger',
          default: '-'
        }
      ]
    }
  ]
}

export default componentInfo
