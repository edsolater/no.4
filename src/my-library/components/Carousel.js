const componentInfo = {
  class: '数据展示',
  name: 'Carousel',
  icon: require('./icons').Carousel,
  api: [
    {
      type: 'table',
      title: 'Layout',
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
      ],
      notifacion:
        'Layout.Header  Layout.Footer  Layout.Content  的 API 与 Layout 相同'
    }
  ]
}

export default componentInfo
