import React from 'react'
import 'styled-components/macro'

export function List({ children = [], title, ...props }) {
  // console.log('children: ', children)
  if (!Array.isArray(children)) children = [children]
  children = children.flat()

  // 以 Array形式，提取 List.Item
  const listItems = children.filter(child => {
    if (!child.type) return false
    return (
      (typeof child.type === 'function' && child.type.name === 'Item') ||
      (typeof child.type.target === 'function' &&
        child.type.target.name === 'Item')
    )
  })

  // 以 Object 的形式，寻找 List.Title
  const listTitle = children.find(child => {
    if (!child.type) return false
    return (
      (typeof child.type === 'function' && child.type.name === 'Title') ||
      (typeof child.type.target === 'function' &&
        child.type.target.name === 'Title')
    )
  })

  return (
    <ul {...props}>
      {listTitle || title}
      {listItems}
    </ul>
  )
}

//附属组件（可能只有配置而不返回 UI）
List.Item = function Item(props) {
  // console.log('hello')
  // console.log('props: ', props)
  return <li {...props} />
}

//附属组件
List.Title = props => {
  return <div {...props}>{props.children}</div>
}