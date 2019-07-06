import React from 'react'
import * as icons from './asset/reactComponentIcons'
import { Icon, Menu } from 'antd/es'
const { SubMenu, ItemGroup } = Menu

const SideMenu = ({ menuState: { handleSelectItem } }) => {
  const createMenuItem = name => (
    <Menu.Item key={name}>
      <Icon component={icons[name]} />
      <span>{name}</span>
    </Menu.Item>
  )
  const createMenuItemGroup = ([groupName, items]) => (
    <ItemGroup key={groupName} title={<span>{groupName}</span>}>
      {items.map(name => createMenuItem(name))}
    </ItemGroup>
  )
  const createSubMenus = data => {
    return [
      Object.entries(data).map(([category, groups]) => (
        <SubMenu
          key={category}
          title={
            <>
              <img src={icons[category]} />
              <span>{category}</span>
            </>
          }
        >
          {Object.entries(groups).map(group => createMenuItemGroup(group))}
        </SubMenu>
      ))
    ]
  }

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
        onSelect={handleSelectItem}
      >
        {createSubMenus({
          Component: {
            General: ['Button', 'Icon', 'Image', 'Typography'],
            Feedback: [
              'Alert',
              'Message',
              'Modal',
              'Notification',
              'Popconfirm'
            ],
            Navigation: ['VerticalNavigator', 'Breadcrumb'],
            'Data Display': ['Tree', 'Card', 'Collapse']
          }
        })}
      </Menu>
    </div>
  )
}
export default SideMenu

// 需要改用更符合语义的 Menu 组件
