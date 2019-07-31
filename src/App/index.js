import React from 'react'
import * as myLibrary from '../lib'
import { Layout } from 'antd/es'
// 子组件
import { TopIndicator } from './TopIndicator'
import { SideMenu } from './SideMenu'
import { Preview } from './Preview'
import { Dashboard } from './Dashboard'
import { Example } from './Example'
import { RelatedItem } from './RelatedItem'

export const App = () => {
  const [selectedComponentName, selectComponentName] = React.useState('button')
  const selectedComponent = myLibrary.components[selectedComponentName]

  // 当体量够大时要用 Redux 抽象逻辑
  // dashboard的全部 widgets配置
  const [activeSettings, dispatchActiveSetting] = React.useReducer(
    function settingReducer(state, action) {
      switch (action.type) {
        case 'set': {
          const { key, value, config } = action
          if (key) return { ...state, [key]: value }
          if (config) return { ...state, config }
        }
        case 'cover': {
          const { config } = action
          return config
        }
        case 'delete': {
          const { key, value, config } = action
          if (key) return { ...state, [key]: value }
          if (config) return { ...state, config }
        }
        default: {
          throw new Error(
            `unknown action type(${action.type}) for dashboard setting`
          )
        }
      }
    },
    {}
  )
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
            dispatchWidgetBackground={dispatchWidgetBackground}
          />
          <Dashboard
            selectedComponent={selectedComponent}
            activeSettings={activeSettings}
            dispatchActiveSetting={dispatchActiveSetting}
            widgetBackgrounds={widgetBackgrounds}
            dispatchWidgetBackground={dispatchWidgetBackground}
          />
          {/* 如果是展示function用法 <Example selectedComponent={selectedComponent} /> */}
          <RelatedItem
            allComponents={Object.values(myLibrary.components)}
            selectedComponent={selectedComponent}
          />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
