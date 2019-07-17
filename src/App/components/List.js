import React from 'react'
import 'styled-components/macro'

export const List = ({ children = [] }) => {
  if (!Array.isArray(children)) children = [children] //如果只有单一一层子组件，就包上一层数组
  // 处理包裹的 List.Item 子组件
  const items = children.filter(child => child.type.displayName === 'Item')
  items.forEach(item => console.log('item: ', item))

  return <div>this is list{items}</div>
}

List.Item = props => {
  return <div>this</div>
}
List.Item.displayName = 'Item'
