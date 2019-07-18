import React from 'react'
import * as myLibrary from '../lib'
import { Layout } from 'antd/es'
// 子组件
import TopIndicator from './TopIndicator'
import SideMenu from './SideMenu'
import { Dashboard } from './Dashboard'
const { Sider, Content } = Layout

const App = () => {
  const [selectedComponentName, selectComponentName] = React.useState('button')
  const selectedComponent = myLibrary.components[selectedComponentName]
  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <TopIndicator selectedComponent={selectedComponent} />
      <Layout>
        <Sider width={300} theme="light">
          <SideMenu
            allComponents={Object.values(myLibrary.components)}
            selectComponentName={selectComponentName}
          />
        </Sider>
        <Content>
          <Dashboard selectedComponent={selectedComponent} />
        </Content>
      </Layout>
    </Layout>
  )
}
export default App
