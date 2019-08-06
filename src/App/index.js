import React from 'react'
import { connect } from 'react-redux'

import { Layout } from 'antd/es'
import * as myLibrary from '../lib'
import { Grid } from './components'
// import store from './redux/store'

import TopIndicator from './TopIndicator'
import SideMenu from './SideMenu'
import Preview from './Preview'
import Dashboard from './Dashboard'
import RelatedItem from './RelatedItem'
import {
  componentCollection_cover,
  componentCollection_setCurrentByName
} from './redux/actionCreators' // redux

function App({
  componentCollection_cover, // redux
  componentCollection_setCurrentByName // redux
}) {
  React.useLayoutEffect(() => {
    componentCollection_cover({...myLibrary.components})
    componentCollection_setCurrentByName('button')
  })
  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <TopIndicator />
      <Layout>
        <SideMenu />
        <Layout.Content style={{ position: 'relative' }}>
          <Grid grid={{ layoutType: 'land_4' }}>
            <Dashboard />
            <Preview />
            <RelatedItem />
          </Grid>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default connect(
  null,
  { componentCollection_cover, componentCollection_setCurrentByName }
)(App)
