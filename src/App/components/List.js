import React from 'react'
import 'styled-components/macro'
import { groupBy } from 'lodash'
import { getTagName } from './getTagName'

export function List({ children = [], title, ...props }) {
  children = groupBy([children].flat(2), node => getTagName(node))
  return (
    <ul {...props}>
      {children.Title || title}
      {children.Item}
      {children.unknown}
    </ul>
  )
}

List.Item = function Item(props) {
  return <li {...props} />
}
List.Title = function Title(props) {
  return <div {...props} />
}
