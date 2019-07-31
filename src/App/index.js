import React from 'react'
import * as myLibrary from '../lib'
import { Layout } from 'antd/es'
// 子组件
import TopIndicator from './TopIndicator'
import { SideMenu } from './SideMenu'
import { Preview } from './Preview'
import { Dashboard } from './Dashboard'

export const App = () => {
  const [selectedComponentName, selectComponentName] = React.useState('button')
  const selectedComponent = myLibrary.components[selectedComponentName]

  // 当体量够大时要用 Redux 抽象逻辑
  // dashboard的全部 widgets配置
  const [activeSettings, dispatchActiveSetting] = React.useReducer(
    (state, { type, key, value, config }) => {
      switch (type) {
        case 'set': {
          if (key && value) return { ...state, [key]: value }
          if (config) return { ...state, config }
        }
        case 'cover': {
          return config
        }
        case 'delete': {
          return { ...state, [key]: undefined }
        }
        default: {
          throw new Error(`unknown action type(${type}) for dashboard setting`)
        }
      }
    },
    {}
  )

  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <TopIndicator selectedComponent={selectedComponent} />
      <Layout>
        <SideMenu
          allComponents={Object.values(myLibrary.components)}
          selectComponentName={selectComponentName}
        />
        <Layout.Content style={{ position: 'relative' }}>
          <Preview
            selectedComponent={selectedComponent}
            activeSettings={activeSettings}
            dispatchActiveSetting={dispatchActiveSetting}
          />
          <Dashboard
            selectedComponent={selectedComponent}
            activeSettings={activeSettings}
            dispatchActiveSetting={dispatchActiveSetting}
          />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
