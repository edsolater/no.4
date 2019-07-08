import React from 'react'
import { Icon, Menu } from 'antd/es'
const { SubMenu, ItemGroup } = Menu

const SideMenu = ({ componentInfo, icons, selectItem }) => {
  const createMenuItem = itemName => (
    <Menu.Item key={itemName}>
      <Icon component={icons[itemName]} />
      <span>{itemName}</span>
    </Menu.Item>
  )
  const createMenuItemGroup = ([groupName, itemNames]) => (
    <ItemGroup key={groupName} title={<span>{groupName}</span>}>
      {/* {console.log('groupName: ', groupName)} */}
      {/* {console.log('itemNames: ', itemNames)} */}
      {itemNames.map(itemName => createMenuItem(itemName))}
    </ItemGroup>
  )
  const createSubMenus = data => {
    // console.log('data: ', data)
    return [
      Object.entries(data).map(([category, groups]) => (
        <SubMenu
          key={category}
          title={
            <>
              <Icon component={icons[category]} />
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
  const extractComponentMenuTree = allComponents => {
    // console.log('allComopnents: ', allComponents)
    const menuTree = {}
    for (const [componentName, eachComponent] of Object.entries(
      allComponents
    )) {
      const groupName = eachComponent.class
      if (!menuTree[groupName]) menuTree[groupName] = []
      menuTree[groupName].push(eachComponent.componentName || componentName)
    }
    return {Component:menuTree}
  }
  // console.log('extractMenuTree: ', extractComponentMenuTree(componentInfo))
  return (
    <div
      style={{
        gridArea: 'sider',
        background: '#fff'
      }}
    >
      <Menu
        mode="inline"
        theme="dark"
        style={{ height: '100%' }}
        defaultOpenKeys={['Component']}
        defaultSelectedKeys={['Button']}
        onSelect={({ key }) => selectItem(key)}
      >
        {createSubMenus(extractComponentMenuTree(componentInfo))}
      </Menu>
    </div>
  )
}
export default SideMenu

// 需要改用更符合语义的 Menu 组件
