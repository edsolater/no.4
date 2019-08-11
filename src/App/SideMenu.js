import React from 'react'
import { connect } from 'react-redux'
import { Layout, Icon, Menu, Tag, Tooltip } from 'antd/es'
import { ReactComponent as Component } from './icons/folder-react-components.svg'
import { color } from './settings/style'
import { getAllComponents } from './redux/selectors'
import { componentCollection_currentName_set } from './redux/actionCreators'
const classIcons = { Component }
const { SubMenu, ItemGroup } = Menu

//转换一切字符串分割形式为 PascalCase
const toPascalCase = str => {
  return (
    str &&
    str
      .replace(
        /^\w|[A-Z]|\b\w/g, // 挑选出以各种方式标记出的首字母
        word => word.toUpperCase() // 转换成大写形式
      )
      .replace(/\s+/g, '')
  ) // 去除分割符中可能有的所有空格
}
function SideMenu({
  componentCollection_currentName_set, // redux
  componentCollection // redux
}) {
  // 智能分类组件名
  const classifyComponent = () => {
    const groupOrder = {
      通用: [],
      布局: [],
      导航: [],
      '控件（以下暂不考虑）': [],
      数据展示: [],
      反馈: [],
      其他: []
    }
    const mapClassName = name => {
      const patterns = [
        { pattern: /general|通用/, output: '通用' },
        { pattern: /layout|布局/, output: '布局' },
        { pattern: /navigation|导航/, output: '导航' },
        { pattern: /data entry|数据录入|控件/, output: '控件（以下暂不考虑）' },
        { pattern: /data display|数据展示/, output: '数据展示' },
        { pattern: /feedback|反馈/, output: '反馈' },
        { pattern: /.*/, output: '其他' }
      ]
      return patterns.find(({ pattern }) => pattern.test(name)).output
    }
    componentCollection.forEach((eachComponent = {}) => {
      groupOrder[mapClassName(eachComponent.class)].push(eachComponent)
    })
    return groupOrder
  }

  // 数据：menu的组织结构树
  const data = {
    Component: classifyComponent()
  }

  // 生成 menu树组件
  const createSubMenus = subMenuData => {
    const createMenuItemGroup = groupedItemData => {
      const [groupName, components] = groupedItemData
      const createMenuItem = component => {
        return (
          <Menu.Item key={component.name}>
            <Icon
              component={component.icon}
              style={{
                color: color.componentColorInGroup[component.class] || 'gray'
              }}
            />
            <Tooltip placement='right' title={component.name_cn}>
              <span>{toPascalCase(component.name)}</span>
            </Tooltip>
            <span style={{ marginLeft: 12 }}>
              {component.tags.map(tag => (
                <Tag key={component.name + tag}>{tag}</Tag>
              ))}
            </span>
          </Menu.Item>
        )
      }
      return (
        <ItemGroup key={groupName} title={<span>{groupName}</span>}>
          {components.map(item => createMenuItem(item))}
        </ItemGroup>
      )
    }
    return [
      Object.entries(subMenuData).map(([className, groups]) => (
        <SubMenu
          key={className}
          title={
            <>
              <Icon component={classIcons[className]} />
              <span>{className}</span>
            </>
          }
        >
          {Object.entries(groups).map(group => createMenuItemGroup(group))}
        </SubMenu>
      ))
    ]
  }

  // menu组件
  return (
    <Layout.Sider width={300} theme='light'>
      <Menu
        mode='inline'
        style={{ height: '100%', overflowX: 'hidden', overflowY: 'scroll' }}
        defaultOpenKeys={['Component']}
        defaultSelectedKeys={['Button']}
        onSelect={({ key: componentName }) => {
          componentCollection_currentName_set(componentName)
        }}
      >
        {createSubMenus(data)}
      </Menu>
    </Layout.Sider>
  )
}

// TODO: 组件加上中文名称

export default connect(
  store => ({
    componentCollection: getAllComponents(store)
  }),
  { componentCollection_currentName_set }
)(SideMenu)
