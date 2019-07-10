import React from 'react'
import * as myLibrary from '../my-library'
import { Layout } from 'antd/es'
// 子组件
import TopIndicator from './TopIndicator'
import SideMenu from './SideMenu'
import InfoPanel from './InfoPanel'
const { Header, Sider, Content } = Layout


const App = () => {
  const [selectedComponentName, selectComponentName] = React.useState('Button')
  let selectedComponent = myLibrary.components[selectedComponentName.toLowerCase()]
  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Header style={{ height: 40, background: '#000c17' }}>
        <TopIndicator selectedItem={selectedComponent} />
      </Header>
      <Layout>
        <Sider>
          <SideMenu
            allComponents={Object.values(myLibrary.components)}
            selectComponentName={selectComponentName}
          />
        </Sider>
        <Content>
          <InfoPanel selectedItem={selectedComponent} />
        </Content>
      </Layout>
    </Layout>
  )
}
export default App
