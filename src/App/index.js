import React from 'react'
import * as icons from './asset/reactComponentIcons'
import * as myLibrary from '../my-library'
import { Layout } from 'antd/es'
import TopIndicator from './TopIndicator'
import SideMenu from './SideMenu'
import InfoPanel from './InfoPanel'


const { Header, Sider, Content } = Layout
const App = () => {
  const [selectedItem, selectItem] = React.useState('Button')
  const itemInfo = {
    icon: icons[selectedItem],
    name: selectedItem,
    info: myLibrary.components[selectedItem.toLocaleLowerCase()].info
  }
  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Header style={{ height: 40, background: '#000c17' }}>
        <TopIndicator selectedItemInfo={itemInfo}/>
      </Header>
      <Layout>
        <Sider trigger={null}>
          <SideMenu icons={icons} selectItem={selectItem} />
        </Sider>
        <Content>
          <InfoPanel selectedItemInfo={itemInfo}/>
        </Content>
      </Layout>
    </Layout>
  )
}
export default App
