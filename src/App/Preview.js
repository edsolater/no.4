import React from 'react'
import { Box, Grid, List } from './components'
// import { Switch, Input, Slider, InputNumber, Radio } from 'antd/es'

export const Preview = ({
  selectedComponent,
  activeSettings,
  dispatchActiveSetting
}) => (
  <Box
    style={{
      width: '100%',
      height: 480,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Grid>
      <Box>
        <List>
          {selectedComponent.presets.map(setting => (
            <List.Item
              key={setting.toSource()}
              onClick={() =>
                dispatchActiveSetting({ type: 'cover', config: setting })
              }
            >
              {setting.toSource()}
            </List.Item>
          ))}
        </List>
      </Box>
      <selectedComponent.Preview {...activeSettings} />
    </Grid>
  </Box>
)
