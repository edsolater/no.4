import React from 'react'
import { connect } from 'react-redux'
import 'styled-components/macro'
import { Tooltip } from 'antd/es'
import { List, Box } from './components'
import { isEqualWith, isEmpty } from 'lodash'
import { Widget } from './Dashboard__Widget'
import {
  settedProps_set,
  settedProps_delete,
  settedProps_cover
} from './redux/actionCreators'
import { getSettedProps, getCurrentSelection } from './redux/selectors'

function Dashboard({
  selectedComponent, //redux
  settedProps, // redux
  settedProps_set, //redux
  settedProps_delete, // redux
  settedProps_cover, //redux
  ...restProps
}) {
  console.log('settedProps: ', settedProps)
  function setValue(value, propInfo) {
    if (
      isEqualWith(value, propInfo.default, (a, b) => {
        return b === undefined ? a === Boolean(b) : undefined
      }) ||
      value === undefined
    ) {
      settedProps_delete(propInfo.name)
    } else {
      settedProps_set(propInfo.name, value)
    }
  }
  React.useEffect(() => {
    if (isEmpty(settedProps)) {
      settedProps_cover(selectedComponent.presets[0])
    }
  }, [selectedComponent, settedProps_cover])

  //组件的UI设置
  const tables = Object.entries(selectedComponent.reactProps || {})
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
                  background: ${settedProps[propInfo.name] && 'dodgerblue'};
                  opacity: 0.1;
                  position: absolute;
                  height: 100%;
                  width: 100%;
                }
                ::after {
                  content: '';
                  pointer-events: none;
                  background: ${settedProps[propInfo.name] && 'dodgerblue'};
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
                  color: settedProps[propInfo.name] && 'dodgerblue'
                }}
                onClick={() => setValue(null, propInfo)} // 传入 null 代表清空命令
              >
                🕶
              </div>
              <div>
                <Widget
                  activeValue={settedProps[propInfo.name]}
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

export default connect(
  store => ({
    settedProps: getSettedProps(store),
    selectedComponent: getCurrentSelection(store)
  }),
  {
    settedProps_set,
    settedProps_delete,
    settedProps_cover
  }
)(Dashboard)
