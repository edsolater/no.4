import React from 'react'
import { Table, Card } from 'antd/es'

// react-component
const APITable = ({ apiArray }) => {
  return (
    <>
      {apiArray.map(api => (
        <Table
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

// react component
const InfoPanel = ({ selectedItemInfo }) => {
  return (
    <div style={{ padding: 10 }}>
      <Card title="API">
        <APITable
          apiArray={selectedItemInfo.api.filter(({ type }) => type === 'table')}
        />
      </Card>
    </div>
  )
}

export default InfoPanel
