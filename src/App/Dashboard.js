import React from 'react'
import { connect } from 'react-redux'
import 'styled-components/macro'
import { Tooltip } from 'antd/es'
import { List, Box } from './components'
import { color } from './settings/style'
import { isEqualWith } from 'lodash'
import { Widget } from './Dashboard__Widget'
import { updateSetting } from './redux/actionCreators'
import { selectSetting } from './redux/selectors'

function Dashboard({
  selectedComponent,
  activeSettings, // redux
  dispatchActiveSetting, // redux
  widgetBackgrounds,
  dispatchWidgetBackground,
  ...restProps
}) {
  function setValue(value, propInfo) {
    if (
      isEqualWith(value, propInfo.default, (a, b) => {
        return b === undefined ? a === Boolean(b) : undefined
      }) ||
      value === undefined
    ) {
      dispatchActiveSetting('delete', { key: propInfo.name })
      dispatchWidgetBackground({ type: 'delete', key: propInfo.name })
    } else {
      dispatchActiveSetting('set', {
        key: propInfo.name,
        value: value
      })
      dispatchWidgetBackground({
        type: 'set',
        key: propInfo.name,
        value: color.componentColorInGroup[selectedComponent.class]
      })
    }
  }
  console.log('activeSettings: ', activeSettings)
  // 如果有的话，最初先加载一次默认样式
  React.useEffect(() => {
    if (selectedComponent.presets)
      dispatchActiveSetting('cover', { config: selectedComponent.presets[0] })
  }, [selectedComponent])

  //组件的UI设置
  const tables = Object.entries(selectedComponent.reactProps)
  return (
    <Box {...restProps}>
      {tables.map(([name, properties]) => (
        <List
          key={name}
          title={tables.length > 1 && name}
          style={{ padding: 0 }}
        >
          {properties.map(propInfo => (
            <List.Item
              key={propInfo.name}
              css={`
                display: flex;
                align-items: center;
                margin-bottom: 1px;
                position: relative;
                transition: all 200ms cubic-bezier(0.08, 0.82, 0.17, 1);

                :hover {
                  background: #00000012;
                }
                ::before {
                  content: '';
                  pointer-events: none;
                  background: ${widgetBackgrounds[propInfo.name]};
                  opacity: 0.1;
                  position: absolute;
                  height: 100%;
                  width: 100%;
                }
                ::after {
                  content: '';
                  pointer-events: none;
                  background: ${widgetBackgrounds[propInfo.name]};
                  position: absolute;
                  height: 100%;
                  width: 10px;
                }
              `}
            >
              <div
                style={{ width: 180, alignSelf: 'start', marginLeft: 20 }}
                onClick={() => setValue(null, propInfo)} // 传入 null 代表清空命令
              >
                <Tooltip title={propInfo.description}>{propInfo.name}</Tooltip>
              </div>
              <div
                style={{
                  width: 32,
                  color: widgetBackgrounds[propInfo.name]
                }}
                onClick={() => setValue(null, propInfo)} // 传入 null 代表清空命令
              >
                🕶
              </div>
              <div>
                <Widget
                  activeValue={activeSettings[propInfo.name]}
                  availableType={propInfo.type}
                  defaultValue={propInfo.default}
                  onChange={value => setValue(value, propInfo)}
                />
              </div>
            </List.Item>
          ))}
        </List>
      ))}
    </Box>
  )
}

const mapState = store => (
  console.log(selectSetting(store)), { activeSettings: selectSetting(store) }
)
const mapDispatch = { dispatchActiveSetting: updateSetting }
export default connect(
  mapState,
  mapDispatch
)(Dashboard)
