import React from 'react'
import { Box, List, Flex } from './components'

export function Preview({
  selectedComponent,
  activeSettings,
  dispatchActiveSetting,
  dispatchWidgetBackground
}) {
  return (
    <Flex>
      <Box>
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
      </Box>
      <selectedComponent.Preview {...activeSettings} />
    </Flex>
  )
}
