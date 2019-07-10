import React from 'react'
import { Icon, Menu } from 'antd/es'
import { ReactComponent as Component } from './assets/icons/folder-react-components.svg'
const categoryIcons = { Component }
const { SubMenu, ItemGroup } = Menu

export default function SideMenu({ allComponents, selectComponentName }) {
  // 根据所有组件蕴含的属性信息，抽离出组织结构树
  const data = {
    Component: (() => {
      // console.log('allComopnents: ', allComponentss)
      const menuTree = {}
      allComponents.forEach(eachComponent => {
        const groupName = eachComponent.class
        if (!menuTree[groupName]) menuTree[groupName] = []
        menuTree[groupName].push(eachComponent)
      })
      return menuTree
    })()
  }
  const createSubMenus = subMenuData => {
    const createMenuItemGroup = groupedItemData => {
      const [groupName, components] = groupedItemData
      const createMenuItem = component => {
        return (
          <Menu.Item key={component.name}>
            <Icon component={component.icon} />
            <span>{component.name}</span>
            <span style={{ marginLeft: 20, opacity: 0.6, fontSize: '.8em' }}>
              {component.name_cn}
            </span>
          </Menu.Item>
        )
      }
      return (
        <ItemGroup key={groupName} title={<span>{groupName}</span>}>
          {/* {console.log('groupName: ', groupName)} */}
          {/* {console.log('itemNames: ', itemNames)} */}
          {components.map(item => createMenuItem(item))}
        </ItemGroup>
      )
    }
    // console.log('data: ', data)
    return [
      Object.entries(subMenuData).map(([category, groups]) => (
        <SubMenu
          key={category}
          title={
            <>
              <Icon component={categoryIcons[category]} />
              <span>{category}</span>
            </>
          }
        >
          {/* {console.log('category: ', category)} */}
          {/* {console.log('groups: ', groups)} */}
          {Object.entries(groups).map(group => createMenuItemGroup(group))}
        </SubMenu>
      ))
    ]
  }
  return (
    <Menu
      mode="inline"
      // theme="dark"
      style={{ height: '100%', overflowX: 'hidden', overflowY: 'scroll' }}
      defaultOpenKeys={['Component']}
      defaultSelectedKeys={['Button']}
      onSelect={({ key }) => selectComponentName(key)}
    >
      {createSubMenus(data)}
    </Menu>
  )
}

// TODO: 组件加上中文名称
