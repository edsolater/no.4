import React from 'react'
import 'styled-components/macro'
import { groupByTag } from './tools'

export function List({ children, title, ...props }) {
  children = groupByTag(children)
  return (
    <ul {...props}>
      {title}
      {children.ListItem}
      {children.undefined}
    </ul>
  )
}

List.Item = function ListItem(props) {
  return <li {...props} />
}
