import React from 'react'
import 'styled-components/macro'
import { groupBy } from 'lodash'

/**
 * pure
 * @param {Array|Object} reactNodes
 * @param {string[]} groupNames
 * @returns {Object}
 *
 */
function getTagName(reactNode) {
  const tag = reactNode.type
  if (typeof tag === 'undefined') return null
  if (typeof tag === 'function') return tag.name
  if (typeof tag === 'object') {
    const innerTag = tag.target
    if (typeof innerTag === 'function') return innerTag.name
    return null
  }
}
export function List({ children = [], title, ...props }) {
  const specialChildren = groupBy([children].flat(2), node => getTagName(node))
  return (
    <ul {...props}>
      {specialChildren.Title || title}
      {specialChildren.Item}
    </ul>
  )
}

List.Item = function Item(props) {
  return <li {...props} />
}
List.Title = function Title(props) {
  return <div {...props} />
}
