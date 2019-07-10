import React from 'react'
import { Icon, Menu } from 'antd/es'
import { ReactComponent as Component } from './assets/icons/folder-react-components.svg'
const categoryIcons = { Component }
const { SubMenu, ItemGroup } = Menu

export default function SideMenu({ allComponents, selectComponentName }) {
  const allIcons = allComponents.reduce(
    (acc, { componentName, icon }) => ({
      ...acc,
      [componentName]: icon
    }),
    {}
  )
  const data = {
    Component: (() => {
      // console.log('allComopnents: ', allComponentss)
      const menuTree = {}
      allComponents.forEach(eachComponent => {
        const groupName = eachComponent.class
        if (!menuTree[groupName]) menuTree[groupName] = []
        menuTree[groupName].push(
          eachComponent.componentName || eachComponent.componentName_en
        )
      })
      return menuTree
    })()
  }
  const createMenu = data => {
    const createSubMenus = data => {
      const createMenuItemGroup = group => {
        const [groupName, itemNames] = group
        const createMenuItem = itemName => {
          return (
            <Menu.Item key={itemName}>
              <Icon component={allIcons[itemName]} />
              <span>{itemName}</span>
            </Menu.Item>
          )
        }
        return (
          <ItemGroup key={groupName} title={<span>{groupName}</span>}>
            {/* {console.log('groupName: ', groupName)} */}
            {/* {console.log('itemNames: ', itemNames)} */}
            {itemNames.map(itemName => createMenuItem(itemName))}
          </ItemGroup>
        )
      }
      // console.log('data: ', data)
      return [
        Object.entries(data).map(([category, groups]) => (
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
        theme="dark"
        style={{ height: '100%' }}
        defaultOpenKeys={['Component']}
        defaultSelectedKeys={['Button']}
        onSelect={({ key }) => selectComponentName(key)}
      >
        {createSubMenus(data)}
      </Menu>
    )
  }
  return (
    <div
      style={{
        gridArea: 'sider',
        background: '#fff'
      }}
    >
      {createMenu(data)}
    </div>
  )
}

// 需要改用更符合语义的 Menu 组件
