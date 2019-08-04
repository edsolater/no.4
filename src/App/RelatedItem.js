import React from 'react'
import { Icon } from 'antd/es'
import { Box } from './components'
import { color } from './settings/style'

export function RelatedItem({ allComponents, selectedComponent }) {
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
