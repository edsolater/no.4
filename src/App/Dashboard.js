import React from 'react'
import { connect } from 'react-redux'
import 'styled-components/macro'
import { Tooltip } from 'antd/es'
import { List, Box } from './components'
import { isEmpty } from 'lodash'
import { StateWidgetSeletor } from './StateWidget'
import {
  componentCollection_settedProps_set,
  componentCollection_settedProps_cover
} from './redux/actionCreators'
import { getSettedProps, getCurrentSelection } from './redux/selectors'

function Dashboard({
  selectedComponent, //redux
  settedProps, // redux try
  componentCollection_settedProps_set, //redux
  componentCollection_settedProps_cover, //redux
  ...restProps
}) {
  function setValue(value, propInfo) {
    componentCollection_settedProps_set(propInfo.name, value, propInfo.default)
  }
  React.useEffect(() => {
    if (isEmpty(settedProps)) {
      componentCollection_settedProps_cover(selectedComponent.presets[0])
    }
  }, [selectedComponent, componentCollection_settedProps_cover])

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
                <StateWidgetSeletor
                  activeValue={settedProps[propInfo.name]}
                  originalType={propInfo.type}
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
    componentCollection_settedProps_set,
    componentCollection_settedProps_cover
  }
)(Dashboard)
