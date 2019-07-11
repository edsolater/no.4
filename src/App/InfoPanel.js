import React from 'react'
import { Table, Card } from 'antd/es'

// react component
export default function InfoPanel({ selectedComponent }) {
  return (
    <div style={{ padding: 10 }}>
      <Card title="Example">
        <Example examples={selectedComponent.api} />
      </Card>
      <Card title="API">
        <API api={selectedComponent.api} />
      </Card>
    </div>
  )
}

// 显示组件的预期效果与代码示例
function Example({ examples }) {
  return (
    <>
      {examples.map(api => (
        <Table
          key={api.title}
          rowKey="property" //每一行数据的 rowKey 即使该对象的 property 属性
          title={() => <p>{api.title}</p>}
          columns={[
            { title: 'Property', dataIndex: 'property' },
            { title: '说明', dataIndex: 'description' },
            { title: '值类型', dataIndex: 'type' },
            { title: '默认值', dataIndex: 'default' }
          ]}
          dataSource={api.data}
          pagination={false}
        />
      ))}
    </>
  )
}

// 显示组件Props的表格
function API({ api }) {
  return (
    <>
      {api.map(table => (
        <Table
          key={table.title || 'noTable'}
          rowKey="property" //每一行数据的 rowKey 即使该对象的 property 属性
          title={() => <p>{table.title}</p>}
          columns={[
            { title: 'Property', dataIndex: 'property' },
            { title: '说明', dataIndex: 'description' },
            { title: '值类型', dataIndex: 'type' },
            { title: '默认值', dataIndex: 'default' }
          ]}
          dataSource={table.data}
          pagination={false}
        />
      ))}
    </>
  )
}
