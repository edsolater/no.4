import React from 'react'
import * as icons from './asset/reactComponentIcons'
import { Icon } from 'antd/es'

const TopIndicator = ({ activeComponent, selectCategory }) => {
  console.log('activeComponent: ', activeComponent)
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
        <Icon component={icons[activeComponent]} />
        <span style={{ marginLeft: 20, color: 'hsla(0, 0%, 100%, 0.4)' }}>
          {activeComponent}
        </span>
      </div>
    </div>
  )
}

export default TopIndicator
