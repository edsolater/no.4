import React from 'react'
import { Box } from './components'

/**
 * 展示与之相关的组件的超链接
 * @param {*} param0 
 */
export function RelatedItem({ allComponents, selectedComponent }) {
  const relatedComponents = allComponents.filter(
    component => component.class === selectedComponent.class
  )
  return (
    <Box>
      {relatedComponents.map(component => (
        <div>{component.name}</div>
      ))}
    </Box>
  )
}
