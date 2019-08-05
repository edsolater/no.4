import React from 'react'
import { Layout, Icon } from 'antd/es'
import { color } from './settings/style'

export function TopIndicator({ selectedComponent }) {
  return (
    <Layout.Header
      style={{
        height: 24,
        background:
          color.componentColorInGroup[selectedComponent.class] || 'lightgray'
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Icon component={selectedComponent.icon} />
          <span style={{ marginLeft: 16, color: 'white' }}>
            {selectedComponent.name || selectedComponent.name_en}
          </span>
        </div>
      </div>
    </Layout.Header>
  )
}

// const mapState = state => {
//   const { name, items } = getActiveShelfBoard(state.shelfBoards)
//   return {
//     name,
//     items,
//     activeUserBoard: getActiveUserBoard(state.userBoards)
//   }
// }

// const mapDispatch = {
//   addShelfBoardItem
// }

// export default connect(
//   mapState,
//   mapDispatch
// )(TopIndicator)
