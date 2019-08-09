import React from 'react'
import { connect } from 'react-redux'
import { Layout, Icon } from 'antd/es'
import { color } from './settings/style'
import { getCurrentSelection } from './redux/selectors'

function TopIndicator({
  selectedComponent // redux
}) {
  return (
    <Layout.Header
      style={{
        height: 24,
        background:
          color.componentColorInGroup[selectedComponent.class] || 'lightgray'
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
            {selectedComponent.name}
          </span>
        </div>
      </div>
    </Layout.Header>
  )
}

export default connect(
  store => ({ selectedComponent: getCurrentSelection(store) }),
  null
)(TopIndicator)
