import React from 'react'
import { Layout, Icon } from 'antd/es'

const groupColors = {
  通用: '#8567ca',
  布局: 'gray',
  导航: '#185a65'
}

const TopIndicator = ({ selectedComponent }) => {
  return (
    <Layout.Header
      style={{
        height: 24,
        background: groupColors[selectedComponent.class] || 'lightgray'
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Icon component={selectedComponent.icon} />
          <span style={{ marginLeft: 16, color: 'white' }}>
            {selectedComponent.name || selectedComponent.name_en}
          </span>
        </div>
      </div>
    </Layout.Header>
  )
}

export default TopIndicator
