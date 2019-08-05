import React from 'react'
import { connect } from 'react-redux'
import { Box, List } from './components'
import { componentSetting_cover } from './redux/actionCreators'
import { getComponentSetting } from './redux/selectors'

function Preview({
  selectedComponent,
  componentSetting, // redux
  componentSetting_cover, // redux
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

const mapState = store => ({ componentSetting: getComponentSetting(store) })
const mapDispatch = { componentSetting_cover }
export default connect(
  mapState,
  mapDispatch
)(Preview)
