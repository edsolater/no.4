import React from 'react'
import * as myLibrary from '../my-library'
import { Layout } from 'antd/es'
// 子组件
import TopIndicator from './TopIndicator'
import SideMenu from './SideMenu'
import InfoPanel from './InfoPanel'
const { Header, Sider, Content } = Layout

const { allComponents, componentIcons } = myLibrary.components

const App = () => {
  const [selectedItemName, selectItemName] = React.useState('Button')
  let selectedItem = myLibrary.components[selectedItemName.toLowerCase()] || {
    icon: componentIcons[selectedItemName],
    componentName: selectedItemName,
    api: allComponents[selectedItemName].api
  }
  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Header style={{ height: 40, background: '#000c17' }}>
        <TopIndicator selectedItem={selectedItem} />
      </Header>
      <Layout>
        <Sider>
          <SideMenu
            allComponents={allComponents}
            icons={componentIcons}
            selectItem={selectItemName}
          />
        </Sider>
        <Content>
          <InfoPanel selectedItem={selectedItem} />
        </Content>
      </Layout>
    </Layout>
  )
}
export default App
