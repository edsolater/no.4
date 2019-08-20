import React from 'react'
import { connect } from 'react-redux'
import * as myLibrary from '../lib'
import { Grid } from './components'
// import store from './redux/store'

import TopIndicator from './TopIndicator'
import SideMenu from './SideMenu'
import Preview from './Preview'
import Dashboard from './Dashboard'
import RelatedItem from './RelatedItem'
import {
  componentCollection_all_cover,
  componentCollection_currentName_set
} from './redux/actionCreators' // redux

function App({
  componentCollection_all_cover, // redux
  componentCollection_currentName_set // redux
}) {
  React.useLayoutEffect(() => {
    componentCollection_all_cover(Object.values(myLibrary.components))
    componentCollection_currentName_set('button')
  })
  return (
    <Grid
      style={{
        width: '100vw',
        height: '100vh',
        display:'grid',
        gridTemplateColumns:'1fr 2fr 1fr',
        gridTemplateRows:'32px 1fr'
      }}
    >
      <TopIndicator style={{ gridColumn: '1/-1' }} />
      <SideMenu />
      <Grid grid={{ layoutType: 'land_4' }}>
        <Dashboard />
        <Preview />
      </Grid>
      <RelatedItem />
    </Grid>
  )
}

export default connect(
  null,
  { componentCollection_all_cover, componentCollection_currentName_set }
)(App)
