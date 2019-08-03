import React from 'react'
import 'styled-components/macro'
import { groupByTag } from './extractors'

export function List({ children = [], title, ...props }) {
  children = groupByTag(children)
  return (
    <ul {...props}>
      {children.Title || title}
      {children.Item}
      {children.undefined}
    </ul>
  )
}

List.Item = function Item(props) {
  return <li {...props} />
}
List.Title = function Title(props) {
  return <div {...props} />
}
