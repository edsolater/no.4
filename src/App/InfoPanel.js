import React from 'react'
import { Table, Card } from 'antd/es'

// react-component
const APITable = ({ tableName, tableData }) => {
  const createTable = ({ title = 'unknown', data }) => (
    <Table
      title={() => <p>{title}</p>}
      columns={[
        { title: 'Property', dataIndex: 'property' },
        { title: '说明', dataIndex: 'description' },
        { title: '值类型', dataIndex: 'type' },
        { title: '默认值', dataIndex: 'default' }
      ]}
      dataSource={data}
      pagination={false}
    />
  )
  if (Array.isArray(tableData)) {
    // 只需显示一个表单，传入的 tableData 就是表单项的数据
    return createTable({ title: tableName, data: tableData })
  } else {
    // 需要显示多个表单，传入的 tableData 需要拆分
    return Object.entries(tableData).map(([tableName, tableData]) =>
      createTable({ title: tableName, data: tableData })
    )
  }
}

// react component
const InfoPanel = ({ selectedItemInfo }) => {
  const { name: tableName, api } = selectedItemInfo
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#6e6e6e',
        padding:10
      }}
    >
      <Card title="API">
        <APITable tableName={tableName} tableData={api.tableData} />
      </Card>
    </div>
  )
}

export default InfoPanel
