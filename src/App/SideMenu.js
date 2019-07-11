import React from 'react'
import { Icon, Menu } from 'antd/es'
import { ReactComponent as Component } from './assets/icons/folder-react-components.svg'
const categoryIcons = { Component }
const { SubMenu, ItemGroup } = Menu

export default function SideMenu({ allComponents, selectComponentName }) {
  // 按规则智能分类组件
  const classifyComponent = () => {
    // console.log('allComopnents: ', allComponentss)
    const groupOrder = {
      通用: [],
      布局: [],
      导航: [],
      数据录入: [],
      数据展示: [],
      反馈: [],
      其他: []
    }
    const mapClassName = name => {
      const patterns = [
        { pattern: /general|通用/, output: '通用' },
        { pattern: /layout|布局/, output: '布局' },
        { pattern: /navigation|导航/, output: '导航' },
        { pattern: /data entry|数据录入/, output: '数据录入' },
        { pattern: /data display|数据展示/, output: '数据展示' },
        { pattern: /feedback|反馈/, output: '反馈' },
        { pattern: /./, output: '其他' }
      ]
      return patterns.find(({ pattern }) => pattern.test(name)).output
    }
    allComponents.forEach(eachComponent => {
      groupOrder[mapClassName(eachComponent.class)].push(eachComponent)
    })
    return groupOrder
  }
  // menu的组织结构树
  const data = {
    Component: classifyComponent()
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
