import React from 'react'
import { Modal } from 'antd/es'

const componentName = 'modal'

export default {
  class: '反馈',
  name: componentName,
  tags: ['antd'],
  icon: require('./icons')[componentName],
  Preview({ children, ...props }) {
    return <Modal {...props}>{children}</Modal>
  },
  api: [
    {
      type: 'comment',
      content:
        '<Layout>\n        <Header>header</Header>\n        <Layout>\n          <Sider>left sidebar</Sider>\n          <Content>main content</Content>\n          <Sider>right sidebar</Sider>\n        </Layout>\n        <Footer>footer</Footer>\n      </Layout>'
    },
    {
      
      title: 'Layout',
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
      ],
      notifacion:
        'Layout.Header  Layout.Footer  Layout.Content  的 API 与 Layout 相同'
    },
    {
      
      title: 'Layout.Sider',
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
      type: 'comment',
      title: 'breakpoint width',
      content:
        "{\n          xs: '480px',\n          sm: '576px',\n          md: '768px',\n          lg: '992px',\n          xl: '1200px',\n          xxl: '1600px',\n        }"
    }
  ],
  presets: [
    {
      children: 'BUTTON',
      type: 'primary'
    }
  ]
}
