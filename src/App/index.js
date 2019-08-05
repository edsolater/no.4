import React from 'react'
import { Layout } from 'antd/es'
import { Provider } from 'react-redux'
import * as myLibrary from '../lib'
import { Grid } from './components'
import store from './redux/store'

import { TopIndicator } from './TopIndicator'
import { SideMenu } from './SideMenu'
import  Preview  from './Preview'
import  Dashboard  from './Dashboard'
import { Example } from './Example'
import { RelatedItem } from './RelatedItem'


export function App() {
  const [selectedComponentName, selectComponentName] = React.useState('button')
  const selectedComponent = myLibrary.components[selectedComponentName]

  const [widgetBackgrounds, dispatchWidgetBackground] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'set': {
          const { key, value } = action
          if (state[key] !== value) return { ...state, [key]: value }
          return { ...state }
        }
        case 'delete': {
          const { key, value } = action
          if (key) return { ...state, [key]: value }
        }
        case 'clear': {
          return {}
        }
        default: {
          throw new Error(
            `unknown action type(${action.type}) for widget background`
          )
        }
      }
    },
    {}
  )

  return (
    <Provider store={store}>
      <Layout style={{ width: '100vw', height: '100vh' }}>
        <TopIndicator selectedComponent={selectedComponent} />
        <Layout>
          <SideMenu
            allComponents={Object.values(myLibrary.components)}
            selectComponentName={selectComponentName}
          />
          <Layout.Content style={{ position: 'relative' }}>
            <Grid grid={{ layoutType: 'land_4' }}>
              <Dashboard
                selectedComponent={selectedComponent}
                widgetBackgrounds={widgetBackgrounds}
                dispatchWidgetBackground={dispatchWidgetBackground}
              />
              <Preview
                selectedComponent={selectedComponent}
                dispatchWidgetBackground={dispatchWidgetBackground}
              />
              {/* 如果是展示function用法 <Example selectedComponent={selectedComponent} /> */}
              <RelatedItem
                allComponents={Object.values(myLibrary.components)}
                selectedComponent={selectedComponent}
              />
            </Grid>
          </Layout.Content>
        </Layout>
      </Layout>
    </Provider>
  )
}
