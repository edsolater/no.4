import React from 'react'
import { connect } from 'react-redux'
import { Icon } from 'antd/es'
import { Box } from './components'
import { color } from './settings/style'
import { getRelatedComponents, getCurrentSelection } from './redux/selectors'
import { componentCollection_currentName_set } from './redux/actionCreators'

function RelatedItem({
  relatedComponents, // redux
  componentCollection_currentName_set, // redux
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
            onClick={()=>componentCollection_currentName_set(component)}
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
    relatedComponents: getRelatedComponents(store),
    selectedComponent: getCurrentSelection(store)
  }),
  {componentCollection_currentName_set }
)(RelatedItem)
