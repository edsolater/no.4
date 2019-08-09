import React from 'react'
import { connect } from 'react-redux'
import { Box, List } from './components'
import { currentProps_cover } from './redux/actionCreators'
import { getComponentSetting, getCurrentSelection } from './redux/selectors'

function Preview({
  selectedComponent, // redux
  currentProps, // redux
  currentProps_cover, // redux
  ...restProps
}) {
  return (
    <Box {...restProps}>
      <List>
        {selectedComponent.presets.map(setting => (
          <List.Item
            key={setting.toSource()}
            onClick={() => {
              currentProps_cover(setting)
            }}
          >
            {setting.toSource()}
          </List.Item>
        ))}
      </List>
      <selectedComponent.Preview {...currentProps} />
    </Box>
  )
}

export default connect(
  store => ({
    currentProps: getComponentSetting(store),
    selectedComponent: getCurrentSelection(store)
  }),
  { currentProps_cover }
)(Preview)
