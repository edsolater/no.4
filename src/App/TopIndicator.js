import React from 'react'
import { Icon } from 'antd/es'

const TopIndicator = ({ selectedComponent }) => {
  return (
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
  )
}

export default TopIndicator
