import React from 'react'
import { Icon } from 'antd/es'

const TopIndicator = ({ selectedItem }) => {
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
        <Icon component={selectedItem.icon} />
        <span style={{ marginLeft: 16, color: 'hsla(0, 0%, 100%, 0.4)' }}>
          {selectedItem.componentName || selectedItem.componentName_en}
        </span>
      </div>
    </div>
  )
}

export default TopIndicator
