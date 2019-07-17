import React from 'react'
import 'styled-components/macro'

//导出组件
export const List = ({ children = [] }) => {
  if (!Array.isArray(children)) children = [children] //如果只有单一一层子组件，就包上一层数组
  // 处理包裹的 List.Item 子组件
  const items = children.filter(child => child.type.displayName === 'Item')

  return <div>this is list{items}</div>
}

//附属组件（可能只有配置而不返回 UI）
List.Item = props => {
  return <div>this</div>
}
List.Item.displayName = 'Item'
