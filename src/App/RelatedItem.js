import React from 'react'
import { connect } from 'react-redux'
import { Icon } from 'antd/es'
import { Box } from './components'
import { color } from './settings/style'
import { getRelatedComponents, getCurrentSelection } from './redux/selectors'
import { componentCollection_setCurrentByName } from './redux/actionCreators'

function RelatedItem({
  relatedComponents, // redux
  componentCollection_setCurrent, // redux
  selectedComponent // redux
}) {
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
              component={component.Icon}
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
    relatedComponents: getRelatedComponents(store),
    selectedComponent: getCurrentSelection(store)
  }),
  { componentCollection_setCurrent: componentCollection_setCurrentByName }
)(RelatedItem)
