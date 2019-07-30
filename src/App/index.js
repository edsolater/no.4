import React from 'react'
import * as myLibrary from '../lib'
import { Layout } from 'antd/es'
// 子组件
import TopIndicator from './TopIndicator'
import SideMenu from './SideMenu'
import { Dashboard } from './Dashboard'
import { Preview } from './Preview'

export const App = () => {
  const [selectedComponentName, selectComponentName] = React.useState('button')
  const selectedComponent = myLibrary.components[selectedComponentName]

  // 当体量够大时要用 Redux 抽象逻辑
  // dashboard的全部 widgets配置
  const [activeSettings, dispatchActiveSetting] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'set': {
        const newState = { ...state }
        newState[action.key] = action.value
        console.log(`[set a new widgetSetting] ${action.key}: `, action.value)
        return newState
      }
      case 'cover all': {
        const newState = action.all
        console.log(`[cover all widgetSettings] all: `, action.all)
        return newState
      }
      case 'delete': {
        const newState = { ...state }
        delete newState[action.key]
        console.log(`[delete an exist widgetSetting] ${action.key}`)
        return newState
      }
      default: {
        throw new Error('unknown action type for dashboard setting')
      }
    }
  }, {})

  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <TopIndicator selectedComponent={selectedComponent} />
      <Layout>
        <SideMenu allComponents={Object.values(myLibrary.components)} selectComponentName={selectComponentName} />
        <Layout.Content style={{ position: 'relative' }}>
          <Preview selectedComponent={selectedComponent} activeSettings={activeSettings} />
          <Dashboard
            selectedComponent={selectedComponent}
            dispatchActiveSetting={dispatchActiveSetting}
            activeSettings={activeSettings}
          />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
