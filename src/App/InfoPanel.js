import React from 'react'
import { Table, Icon } from 'antd/es'

const API = ({ tableData }) => {
  if (Array.isArray(tableData)) {
    // 只需显示一个表单，传入的 tableData 就是表单项的数据
    return (
      <Table
        title={() => <p>main</p>}
        columns={[
          { title: 'Property', dataIndex: 'property' },
          { title: '说明', dataIndex: 'description' },
          { title: '值类型', dataIndex: 'type' },
          { title: '默认值', dataIndex: 'default' }
        ]}
        dataSource={tableData}
        pagination={false}
      />
    )
  } else {
    // 需要显示多个表单，传入的 tableData 需要拆分
    return Object.entries(tableData).map(([tableName, tableData]) => (
      <Table
        title={() => <p>{tableName}</p>}
        columns={[
          { title: 'Property', dataIndex: 'property' },
          { title: '说明', dataIndex: 'description' },
          { title: '值类型', dataIndex: 'type' },
          { title: '默认值', dataIndex: 'default' }
        ]}
        dataSource={tableData}
        pagination={false}
      />
    ))
  }
}

const InfoPanel = ({ selectedItemInfo }) => {
  const { api } = selectedItemInfo
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#6e6e6e'
      }}
    >
      <API tableData={api.tableData} />
    </div>
  )
}

export default InfoPanel
