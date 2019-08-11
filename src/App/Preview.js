import React from 'react'
import { connect } from 'react-redux'
import { Box, List } from './components'
import { componentCollection_settedProps_cover } from './redux/actionCreators'
import { getSettedProps, getCurrentSelection } from './redux/selectors'

function Preview({
  selectedComponent, // redux
  settedProps, // redux
  componentCollection_settedProps_cover, // redux
  ...restProps
}) {
  return (
    <Box {...restProps}>
      <List>
        {selectedComponent.presets.map(setting => (
          <List.Item
            key={JSON.stringify(setting)}
            onClick={() => {
              componentCollection_settedProps_cover(setting)
            }}
          >
            {JSON.stringify(setting)}
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
  { componentCollection_settedProps_cover }
)(Preview)
