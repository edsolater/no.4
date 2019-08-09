import React from 'react'
import { connect } from 'react-redux'
import { Box, List } from './components'
import { settedProps_cover } from './redux/actionCreators'
import { getSettedProps, getCurrentSelection } from './redux/selectors'

function Preview({
  selectedComponent, // redux
  settedProps, // redux
  settedProps_cover, // redux
  ...restProps
}) {
  return (
    <Box {...restProps}>
      <List>
        {selectedComponent.presets.map(setting => (
          <List.Item
            key={setting.toSource()}
            onClick={() => {
              settedProps_cover(setting)
            }}
          >
            {setting.toSource()}
          </List.Item>
        ))}
      </List>
      <selectedComponent.Preview {...settedProps} />
    </Box>
  )
}

export default connect(
  store => ({
    settedProps: getSettedProps(store),
    selectedComponent: getCurrentSelection(store)
  }),
  { settedProps_cover }
)(Preview)
