import React from 'react'
import * as componentItems from '../my-library/components'
import { Layout } from 'antd/es'
import TopIndicator from './TopIndicator'
import SideMenu from './SideMenu'

const components = Object.values(componentItems)

const { Header, Sider, Content } = Layout

const App = () => {
  const [activeComponent, selectComponent] = React.useState('Button')
  const handleSelectItem = ({ key }) => selectComponent(key)
  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Header style={{ height: 40, background: '#000c17' }}>
        <TopIndicator activeComponent={activeComponent} />
      </Header>
      <Layout>
        <Sider trigger={null}>
          <div className="logo" />
          <SideMenu
            menuState={{
              handleSelectItem
            }}
          />
        </Sider>
        <Content />
      </Layout>
    </Layout>
  )
}
export default App
