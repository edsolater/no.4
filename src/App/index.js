import React from 'react'
import * as myLibrary from '../lib'
import { Layout } from 'antd/es'
// 子组件
import TopIndicator from './TopIndicator'
import SideMenu from './SideMenu'
import Dashboard from './Dashboard'
const { Header, Sider, Content } = Layout

const App = () => {
  const [selectedComponentName, selectComponentName] = React.useState('button')
  const selectedComponent =
    myLibrary.components[selectedComponentName]
  const [headerColor, setHeaderColor] = React.useState(
    selectedComponent.color || '#b6aee4'
  ) // TODO: 未来需要标题栏的颜色依组件图标的颜色而改变
  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Header style={{ height: 40, background: headerColor }}>
        <TopIndicator
          selectedComponent={selectedComponent}
          setHeaderColor={setHeaderColor}
        />
      </Header>
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
