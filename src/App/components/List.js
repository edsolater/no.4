import React from 'react'
import 'styled-components/macro'

//导出组件
export const List = ({ children = [], title }) => {
  //规范化/扁平化 children
  if (!Array.isArray(children)) children = [children] //如果只有单一一层子组件，就包上一层数组
  children = children.flat() //拆分数字形式的子组件组

  // 以 Array形式，提取 List.Item
  const listItems = children.filter(
    child => child.type && child.type.displayName === 'Item'
  )

  // 以 Object 的形式，寻找 List.Title
  const listTitle = children.find(
    child => child.type && child.type.displayName === 'Title'
  )

  return (
    <ul>
      {listTitle || title}
      {listItems}
    </ul>
  )
}

//附属组件（可能只有配置而不返回 UI）
List.Item = props => {
  return <li {...props} />
}
List.Item.displayName = 'Item'

//附属组件
List.Title = props => {
  return <div {...props}>{props.children}</div>
}
List.Title.displayName = 'Title'
