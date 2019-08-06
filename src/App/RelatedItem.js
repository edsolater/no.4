import React from 'react'
import { connect } from 'react-redux'
import { Icon } from 'antd/es'
import { Box } from './components'
import { color } from './settings/style'
import { getAllComponents, getCurrentSelection } from './redux/selectors'
import { componentCollection_setCurrentByName } from './redux/actionCreators'

function RelatedItem({
  componentCollection, // redux
  componentCollection_setCurrent, // redux
  selectedComponent // redux
}) {
  const relatedComponents = componentCollection.filter(
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
  store => ({
    componentCollection: getAllComponents(store),
    selectedComponent: getCurrentSelection(store)
  }),
  { componentCollection_setCurrent: componentCollection_setCurrentByName }
)(RelatedItem)
