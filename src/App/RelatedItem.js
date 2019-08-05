import React from 'react'
import { connect } from 'react-redux'
import { Icon } from 'antd/es'
import { Box } from './components'
import { color } from './settings/style'
import { getAllComponents } from './redux/selectors'
import { currentSelection_change } from './redux/actionCreators'

function RelatedItem({
  allComponents, // redux
  currentSelection_change, // redux
  selectedComponent
}) {
  const relatedComponents = allComponents.filter(
    component => component.class === selectedComponent.class
  )
  return (
    <Box>
      {relatedComponents.map(component => {
        return (
          <div
            key={component.name}
            className='item'
            style={{ background: component === selectedComponent && 'gray' }}
          >
            <div>{component.name}</div>
            <Icon
              component={component.icon}
              style={{
                color: color.componentColorInGroup[component.class] || 'gray'
              }}
            />
          </div>
        )
      })}
    </Box>
  )
}

export default connect(
  store => ({ allComponents: getAllComponents(store) }),
  { currentSelection_change }
)(RelatedItem)
