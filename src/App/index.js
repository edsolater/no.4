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
  componentCollection_setCurrent
} from './redux/actionCreators' // redux

function App({
  componentCollection_cover, // redux
  componentCollection_setCurrent // redux
}) {
  React.useLayoutEffect(() => {
    componentCollection_cover(Object.values(myLibrary.components))
    componentCollection_setCurrent('button')
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
  { componentCollection_cover, componentCollection_setCurrent }
)(App)
