import React from 'react'
import { connect } from 'react-redux'
import { Box } from './components'
import { Icon } from 'antd/es'
import { color } from './settings/style'
import { getCurrentSelection } from './redux/selectors'

function TopIndicator({
  selectedComponent, // redux
  dispatch, // redux
  ...restProps
}) {
  return (
    <Box
      _className='TopIndicator'
      _style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          color.componentColorInGroup[selectedComponent.class] || 'lightgray'
      }}
      {...restProps}
    >
      <Icon component={selectedComponent.icon} />
      <span style={{ marginLeft: 16, color: 'white' }}>
        {selectedComponent.name}
      </span>
    </Box>
  )
}

export default connect(
  store => ({ selectedComponent: getCurrentSelection(store) })
)(TopIndicator)
