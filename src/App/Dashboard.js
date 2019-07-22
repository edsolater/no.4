import React from 'react'
import { Tooltip } from 'antd/es'
import { List } from './components/List'
import { color } from './settings/style'
import { isEqualWith } from 'lodash'
import { Widget } from './Dashboard__Widget'

export const Dashboard = ({ selectedComponent }) => {
  const [widgetBackgrounds, dispatchWidgetBackground] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'set': {
          const newState = { ...state }
          if (newState[action.key] === action.value) return state
          newState[action.key] = action.value
          console.log(
            `[set a new widgetBackground] ${action.key}: `,
            action.value
          )
          return newState
        }
        case 'delete': {
          const newState = { ...state }
          delete newState[action.key]
          console.log(
            `[delete a widgetBackground] ${action.key}: ${action.value}`
          )
          return newState
        }
        default: {
          throw new Error('unknown action type for widget background')
        }
      }
    },
    {}
  )

  // dashboard的全部 widgets配置
  const [activeSettings, dispatchActiveSetting] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'set': {
          const newState = { ...state }
          newState[action.key] = action.value
          console.log(`[set a new widgetSetting] ${action.key}: `, action.value)
          return newState
        }
        case 'cover all': {
          const newState = action.all
          console.log(`[cover all widgetSettings] all: `, action.all)
          return newState
        }
        case 'delete': {
          const newState = { ...state }
          delete newState[action.key]
          console.log(`[delete an exist widgetSetting] ${action.key}`)
          return newState
        }
        default: {
          throw new Error('unknown action type for dashboard setting')
        }
      }
    },
    {}
  )

  function setValue(value, propInfo) {
    if (
      isEqualWith(value, propInfo.default, (a, b) => {
        return b === undefined ? a === Boolean(b) : undefined
      }) ||
      value === undefined
    ) {
      dispatchActiveSetting({ type: 'delete', key: propInfo.name })
      dispatchWidgetBackground({ type: 'delete', key: propInfo.name })
    } else {
      dispatchActiveSetting({ type: 'set', key: propInfo.name, value: value })
      dispatchWidgetBackground({
        type: 'set',
        key: propInfo.name,
        value: color.componentColorInGroup[selectedComponent.class]
      })
    }
  }

  // 如果有的话，最初先加载一次默认样式
  React.useEffect(() => {
    if (selectedComponent.presets)
      dispatchActiveSetting({
        type: 'cover all',
        all: selectedComponent.presets[0]
      })
  }, [selectedComponent]) //  这两项在传入的 Props 不变的情况下永远不会改变，由此 useEffect 变成了 ComponentDidMount 模式

  //组件的UI设置
  const tables = Object.entries(selectedComponent.reactProps)
  const Preview = selectedComponent.Preview // 本来就是自带默认值的，没必要再设定默认值了
  return (
    <div style={{ padding: 10 }}>
      <Preview {...activeSettings} />
      {tables.map(([name, properties]) => (
        <List key={name} title={tables.length > 1 && name}>
          {properties.map(propInfo => {
            return (
              <List.Item
                key={propInfo.name}
                style={{
                  background: widgetBackgrounds[propInfo.name],
                  display: 'flex',
                  marginBottom: 16
                }}
              >
                <div
                  style={{ width: 180 }}
                  onClick={() => setValue(null, propInfo)} // 传入 null 代表清空命令
                >
                  <Tooltip title={propInfo.description}>
                    {propInfo.name}
                  </Tooltip>
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
            )
          })}
        </List>
      ))}
    </div>
  )
}
