import React from 'react'
import { connect } from 'react-redux'
import { Box, List } from './components'
import { componentSetting_cover } from './redux/actionCreators'
import { selectComponentSetting } from './redux/selectors'

function Preview({
  componentSetting, // redux
  componentSetting_cover, // redux
  selectedComponent,
  dispatchWidgetBackground,
  ...restProps
}) {
  return (
    <Box {...restProps}>
      <List>
        {selectedComponent.presets.map(setting => (
          <List.Item
            key={setting.toSource()}
            onClick={() => {
              componentSetting_cover(setting)
              dispatchWidgetBackground({ type: 'clear' })
            }}
          >
            {setting.toSource()}
          </List.Item>
        ))}
      </List>
      <selectedComponent.Preview {...componentSetting} />
    </Box>
  )
}

const mapState = store => ({ componentSetting: selectComponentSetting(store) })
const mapDispatch = { componentSetting_cover }
export default connect(
  mapState,
  mapDispatch
)(Preview)
