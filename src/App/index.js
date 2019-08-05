import React from 'react'
import { connect } from 'react-redux'

import { Layout } from 'antd/es'
import * as myLibrary from '../lib'
import { Grid } from './components'
// import store from './redux/store'

import { TopIndicator } from './TopIndicator'
import SideMenu from './SideMenu'
import Preview from './Preview'
import Dashboard from './Dashboard'
import RelatedItem from './RelatedItem'
import { allComponents_cover } from './redux/actionCreators' // redux

function App({
  allComponents_cover // redux
}) {
  const [selectedComponentName, selectComponentName] = React.useState('button')
  const selectedComponent = myLibrary.components[selectedComponentName]
  React.useEffect(() => {
    allComponents_cover(Object.values(myLibrary.components))
  })
  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <TopIndicator selectedComponent={selectedComponent} />
      <Layout>
        <SideMenu selectComponentName={selectComponentName} />
        <Layout.Content style={{ position: 'relative' }}>
          <Grid grid={{ layoutType: 'land_4' }}>
            <Dashboard selectedComponent={selectedComponent} />
            <Preview selectedComponent={selectedComponent} />
            <RelatedItem selectedComponent={selectedComponent} />
          </Grid>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default connect(
  null,
  { allComponents_cover }
)(App)
