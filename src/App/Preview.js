import React from 'react'
import { connect } from 'react-redux'
import { Box, List, Flex } from './components'
import { updateSetting } from './redux/actionCreators'
import { selectSetting } from './redux/selectors'

export function Preview({
  selectedComponent,
  activeSettings, // redux
  dispatchActiveSetting, // redux
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
              dispatchActiveSetting({ type: 'cover', config: setting })
              dispatchWidgetBackground({ type: 'clear' })
            }}
          >
            {setting.toSource()}
          </List.Item>
        ))}
      </List>
      <selectedComponent.Preview {...activeSettings} />
    </Box>
  )
}

const mapState = store => ({ activeSettings: selectSetting(store) })
const mapDispatch = { dispatchActiveSetting: updateSetting }
export default connect(
  mapState,
  mapDispatch
)(Preview)
