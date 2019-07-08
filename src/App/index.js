import React from 'react'
import * as myLibrary from '../my-library'
import { Layout } from 'antd/es'
// 子组件
import TopIndicator from './TopIndicator'
import SideMenu from './SideMenu'
import InfoPanel from './InfoPanel'
const { Header, Sider, Content } = Layout

const { componentInfo, componentIcons, myComponents } = myLibrary.components

const App = () => {
  const [selectedItem, selectItem] = React.useState('Button')
  const itemInfo = {
    icon: componentIcons[selectedItem],
    name: selectedItem,
    api: componentInfo[selectedItem].api
  }
  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Header style={{ height: 40, background: '#000c17' }}>
        <TopIndicator selectedItemInfo={itemInfo} />
      </Header>
      <Layout>
        <Sider>
          <SideMenu
            componentInfo={componentInfo}
            icons={componentIcons}
            selectItem={selectItem}
          />
        </Sider>
        <Content>
          <InfoPanel selectedItemInfo={itemInfo} />
        </Content>
      </Layout>
    </Layout>
  )
}
export default App
